import CryptoBotAPI from 'crypto-bot-api';

const client = new CryptoBotAPI(process.env.CRYPTO_PAY_TOKEN);

const PRICES = {
  donate: { sand: 199, stone: 299, iron: 599, gold: 999, diamond: 1999, netherite: 3999, blewxays: 7999 },
  keys: { default: 99, mystic: 299, legendary: 999, dungeon: 399 },
  privat: { p7: 199, p15: 499, p25: 999, p49: 1999 },
  items: { spawners_2: 499, spawners_4: 799, krons_1000: 199, coins_100000: 299 }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, id, nick } = req.body;

  if (!PRICES[type] || !PRICES[type][id]) {
    return res.status(400).json({ error: 'Неверный товар' });
  }
  if (!nick) {
    return res.status(400).json({ error: 'Введите ник' });
  }

  const amountUsdt = (PRICES[type][id] / 100).toFixed(2);

  try {
    const invoice = await client.createInvoice({
      asset: 'USDT',
      amount: amountUsdt,
      description: `${type.toUpperCase()}: ${id.toUpperCase()} для ${nick}`,
      payload: `${type}_${id}_${nick}`
    });
    res.json({ payUrl: invoice.bot_invoice_url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка создания счёта' });
  }
}
