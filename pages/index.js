import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(null);

  const buyDonate = async (group) => {
    setLoading(group);
    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group })
      });
      const data = await res.json();
      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        alert('Ошибка при создании счёта');
      }
    } catch (e) {
      alert('Ошибка: ' + e.message);
    }
    setLoading(null);
  };

  const items = [
    { id: 'sand', name: 'SAND', price: 199, icon: '🏖️', color: '#F7E98D', desc: 'Стартовая привилегия' },
    { id: 'stone', name: 'STONE', price: 299, icon: '🪨', color: '#A8A8A8', desc: 'Каменная привилегия' },
    { id: 'iron', name: 'IRON', price: 599, icon: '⚙️', color: '#D8D8D8', desc: 'Железная привилегия' },
    { id: 'gold', name: 'GOLD', price: 999, icon: '👑', color: '#FFD700', desc: 'Золотая привилегия' },
    { id: 'diamond', name: 'DIAMOND', price: 1999, icon: '💎', color: '#5BC8F5', desc: 'Алмазная привилегия' },
    { id: 'netherite', name: 'NETHERITE', price: 3999, icon: '🔥', color: '#4A4A4A', desc: 'Незеритовая привилегия' },
    { id: 'blewxays', name: 'BLEWXAYS', price: 7999, icon: '⭐', color: '#F3D958', desc: 'Легендарная привилегия' }
  ];

  return (
    <div className="container">
      <header className="header">
        <div className="logo">ʙʟᴇᴡxᴀʏꜱ</div>
        <p className="subtitle">Магазин привилегий • Анархия 1.16.5-1.21</p>
      </header>

      <div className="features">
        <div className="feature"><span className="feature-icon">✦</span> Кастом-чары</div>
        <div className="feature"><span className="feature-icon">✦</span> Приват-блоки</div>
        <div className="feature"><span className="feature-icon">✦</span> Боссы</div>
        <div className="feature"><span className="feature-icon">✦</span> Ивенты</div>
      </div>

      <div className="grid">
        {items.map(item => (
          <div key={item.id} className="card">
            <div className="card-icon">{item.icon}</div>
            <h2 className="card-title" style={{ color: item.color }}>{item.name}</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>{item.desc}</p>
            <div className="card-price">{item.price} <span>₽</span></div>
            <button
              className="buy-btn"
              onClick={() => buyDonate(item.id)}
              disabled={loading === item.id}
            >
              {loading === item.id ? 'Загрузка...' : 'Купить'}
            </button>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>© 2026 BlewXays • <a href="https://blewxays.su">blewxays.su</a></p>
        <p style={{ marginTop: '10px' }}>Оплата криптой (USDT, TON) через @CryptoBot</p>
      </footer>
    </div>
  );
}
