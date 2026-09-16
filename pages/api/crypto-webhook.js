import { Rcon } from 'rcon-client';

const COMMANDS = {
  donate: (nick, id) => `lp user ${nick} parent addtemp ${id} 30d`,
  keys: (nick, id) => `cc give p ${id} 1 ${nick}`,
  privat: (nick, id) => {
    const blocks = { p7: 'IRON_BLOCK', p15: 'COAL_ORE', p25: 'DIAMOND_ORE', p49: 'ANCIENT_DEBRIS' };
    return `give ${nick} ${blocks[id]} 1`;
  },
  items: (nick, id) => {
    const cmds = {
      spawners_2: `give ${nick} spawner 2`,
      spawners_4: `give ${nick} spawner 4`,
      krons_1000: `p give ${nick} 1000`,
      coins_100000: `money give ${nick} 100000`
    };
    return cmds[id];
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { update_type, payload } = req.body || {};

  if (update_type === 'invoice_paid') {
    const [type, id, nick] = payload.split('_');
    if (!type || !id || !nick) return res.status(400).end();

    try {
      const rcon = await Rcon.connect({
        host: process.env.RCON_HOST,
        port: parseInt(process.env.RCON_PORT),
        password: process.env.RCON_PASSWORD
      });

      const cmd = COMMANDS[type]?.(nick, id);
      if (cmd) {
        await rcon.send(cmd);
        await rcon.send(`tell ${nick} §6§l◆ §fВы получили §6${id.toUpperCase()}§f! Спасибо за покупку!`);
      }

      await rcon.end();
    } catch (e) {
      console.error('RCON ошибка:', e);
    }
  }

  res.status(200).end();
}
