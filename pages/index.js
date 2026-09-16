import { useState, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(null);
  const [tab, setTab] = useState('donate');
  const [nick, setNick] = useState('');
  const [particles, setParticles] = useState([]);

  // Генерация частиц для живого фона
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 8 + Math.random() * 12,
        size: 3 + Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  const buy = async (type, id) => {
    if (!nick) {
      alert('Введите ваш ник в игре!');
      return;
    }
    setLoading(id);
    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, nick })
      });
      const data = await res.json();
      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        alert(data.error || 'Ошибка при создании счёта');
      }
    } catch (e) {
      alert('Ошибка: ' + e.message);
    }
    setLoading(null);
  };

  const tabs = [
    { id: 'donate', name: 'Привилегии', icon: '👑' },
    { id: 'keys', name: 'Ключи', icon: '🔑' },
    { id: 'privat', name: 'Приваты', icon: '🛡️' },
    { id: 'items', name: 'Прочее', icon: '📦' }
  ];

  const donateItems = [
    { id: 'sand', name: 'SAND', price: 199, icon: '🏖️', color: '#F7E98D', desc: 'Стартовая привилегия' },
    { id: 'stone', name: 'STONE', price: 299, icon: '🪨', color: '#A8A8A8', desc: 'Каменная привилегия' },
    { id: 'iron', name: 'IRON', price: 599, icon: '⚙️', color: '#D8D8D8', desc: 'Железная привилегия' },
    { id: 'gold', name: 'GOLD', price: 999, icon: '👑', color: '#FFD700', desc: 'Золотая привилегия' },
    { id: 'diamond', name: 'DIAMOND', price: 1999, icon: '💎', color: '#5BC8F5', desc: 'Алмазная привилегия' },
    { id: 'netherite', name: 'NETHERITE', price: 3999, icon: '🔥', color: '#4A4A4A', desc: 'Незеритовая привилегия' },
    { id: 'blewxays', name: 'BLEWXAYS', price: 7999, icon: '⭐', color: '#F3D958', desc: 'Легендарная привилегия' }
  ];

  const keyItems = [
    { id: 'default', name: 'Обычный ключ', price: 99, icon: '🔑', color: '#A8A8A8', desc: '1 ключ для кейса default' },
    { id: 'mystic', name: 'Мистический ключ', price: 299, icon: '🗝️', color: '#5BC8F5', desc: '1 ключ для кейса mystic' },
    { id: 'legendary', name: 'Легендарный ключ', price: 999, icon: '🔐', color: '#F3D958', desc: '1 ключ для кейса legendary' },
    { id: 'dungeon', name: 'Ключ от данжа', price: 399, icon: '🚪', color: '#FF6D0A', desc: 'Ключ от секретного данжа' }
  ];

  const privatItems = [
    { id: 'p7', name: 'Приват 7x7', price: 199, icon: '🛡️', color: '#A8A8A8', desc: 'Блок привата 7x7' },
    { id: 'p15', name: 'Приват 15x15', price: 499, icon: '🛡️', color: '#5BC8F5', desc: 'Блок привата 15x15' },
    { id: 'p25', name: 'Приват 25x25', price: 999, icon: '🛡️', color: '#F3D958', desc: 'Блок привата 25x25' },
    { id: 'p49', name: 'Приват 49x49', price: 1999, icon: '🛡️', color: '#FF6D0A', desc: 'Блок привата 49x49' }
  ];

  const itemItems = [
    { id: 'spawners_2', name: 'Спавнеры x2', price: 499, icon: '🕷️', color: '#A8A8A8', desc: '2 спавнера' },
    { id: 'spawners_4', name: 'Спавнеры x4', price: 799, icon: '🕷️', color: '#5BC8F5', desc: '4 спавнера' },
    { id: 'krons_1000', name: '1000 Кронов', price: 199, icon: '☄️', color: '#F3D958', desc: 'Игровая валюта' },
    { id: 'coins_100000', name: '100,000 Монет', price: 299, icon: '💰', color: '#FFD700', desc: 'Игровая валюта' }
  ];

  const currentItems = 
    tab === 'donate' ? donateItems :
    tab === 'keys' ? keyItems :
    tab === 'privat' ? privatItems : itemItems;

  return (
    <>
      <div className="living-bg" />
      
      <div className="particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <div className="container">
        <header className="header">
          <div className="logo">ʙʟᴇᴡxᴀʏꜱ</div>
          <p className="subtitle">Магазин • Анархия 1.16.5-1.21</p>
        </header>

        <div className="tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.icon} {t.name}
            </button>
          ))}
        </div>

        <div className="nick-form">
          <label className="nick-label">Ваш ник в игре:</label>
          <input
            type="text"
            className="nick-input"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            placeholder="Например: BlewXays"
          />
        </div>

        <div className="grid">
          {currentItems.map(item => (
            <div key={item.id} className="card">
              <div className="card-icon">{item.icon}</div>
              <h2 className="card-title" style={{ color: item.color }}>{item.name}</h2>
              <p className="card-desc">{item.desc}</p>
              <div className="card-price">{item.price} <span>₽</span></div>
              <button
                className="buy-btn"
                onClick={() => buy(tab, item.id)}
                disabled={loading === item.id}
              >
                {loading === item.id ? 'Загрузка...' : 'Купить'}
              </button>
            </div>
          ))}
        </div>

        <footer className="footer">
          <p>© 2026 BlewXays • <a href="https://blewxays.ru">blewxays.ru</a></p>
          <p style={{ marginTop: '10px' }}>Оплата криптой (USDT, TON) через @CryptoBot</p>
        </footer>
      </div>
    </>
  );
}
