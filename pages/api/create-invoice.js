import CryptoBotAPI from 'crypto-bot-api';

const client = new CryptoBotAPI(process.env.CRYPTO_PAY_TOKEN);

const prices = {
  sand: 199, stone: 299, iron: 599, gold: 999,
  diamond: 1999, netherite: 3999, blewxays: 7999
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { group } = req.body;
  if (!prices[group]) return res.status(400).json({ error: 'Неверная группа' });

  const amountUsdt = (prices[group] / 100).toFixed(2);

  try {
    const invoice = await client.createInvoice({
      asset: 'USDT',
      amount: amountUsdt,
      description: `Привилегия ${group.toUpperCase()} на 30 дней`,
      payload: `group_${group}`
    });
    res.json({ payUrl: invoice.bot_invoice_url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка создания счёта' });
  }
}
