import { Rcon } from 'rcon-client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { update_type, payload } = req.body || {};

  if (update_type === 'invoice_paid') {
    const group = payload?.replace('group_', '');
    if (!group) return res.status(400).end();

    try {
      const rcon = await Rcon.connect({
        host: process.env.RCON_HOST,
        port: parseInt(process.env.RCON_PORT),
        password: process.env.RCON_PASSWORD
      });
      // ВНИМАНИЕ: нужно передать ник игрока. Если его нет в payload — добавь в описание/кастомное поле.
      // Например, если игрок вводит ник на сайте, передай его в payload: group_sand_nick
      const nick = req.body?.nick || 'BlewXays';
      await rcon.send(`lp user ${nick} parent addtemp ${group} 30d`);
      await rcon.end();
    } catch (e) {
      console.error('RCON ошибка:', e);
    }
  }

  res.status(200).end();
}
