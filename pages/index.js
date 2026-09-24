import { useState, useEffect } from 'react';

export default function Home() {
  const [tab, setTab] = useState('donate');
  const [nick, setNick] = useState('');
  const [currency, setCurrency] = useState('RUB');
  const [quantities, setQuantities] = useState({});
  const [particles, setParticles] = useState([]);

  // Курсы валют (примерные, уточняйте у продавца)
  const rates = {
    RUB: { symbol: '₽', rate: 1 },
    BYN: { symbol: 'Br', rate: 0.032 },
    UAH: { symbol: '₴', rate: 0.42 },
  };

  const formatPrice = (rub) => {
    const c = rates[currency];
    const value = rub * c.rate;
    return `${value.toFixed(currency === 'RUB' ? 0 : 2)} ${c.symbol}`;
  };

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

  const buy = (item, qty = 1) => {
    if (!nick) {
      alert('Введите ваш ник в игре!');
      return;
    }
    const totalRub = item.price * qty;
    const c = rates[currency];
    const total = (totalRub * c.rate).toFixed(currency === 'RUB' ? 0 : 2);
    const text =
      `★ Покупка на BLEWXAYS ★\n` +
      `Товар: ${item.name}\n` +
      `Количество: ${qty}\n` +
      `Сумма: ${total} ${c.symbol}\n` +
      `Валюта: ${currency}\n` +
      `Ник в игре: ${nick}`;
    const url = `https://t.me/polloplp?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const tabs = [
    { id: 'donate', name: 'Привилегии', icon: '★' },
    { id: 'keys', name: 'Ключи', icon: '⛏' },
    { id: 'houses', name: 'Хаусы', icon: '☄' },
    { id: 'privat', name: 'Приваты', icon: '🛡' },
  ];

  const donateItems = [
    {
      id: 'ember', name: 'EMBER', price: 49, icon: '★',
      desc: 'Стартовая привилегия. Анархия — но деньги сильно не решают: решают руки и онлайн.',
      features: ['/kit ember', '/workbench', '/titul', '/feed', '/clearinv', '/back', '/hat'],
      salary: 750, homes: 5, regions: 4, auction: 12, multiplier: 'x1.1',
    },
    {
      id: 'flame', name: 'FLAME', price: 99, icon: '★',
      desc: 'Пламя разгорается. Анархия — но деньги сильно не решают: решают руки и онлайн.',
      features: ['/kit flame', '/titul', '/uc menu', '/fix', '/loom', '/near'],
      salary: 1000, homes: 10, regions: 5, auction: 16, multiplier: 'x1.1',
    },
    {
      id: 'blaze', name: 'BLAZE', price: 149, icon: '★',
      desc: 'Вспышка. Анархия — но деньги сильно не решают: решают руки и онлайн.',
      features: ['/kit blaze', '/titul', '/uc menu', '/ptime set/reset', '/ec', '/sethome', '/afk'],
      salary: 1500, homes: 15, regions: 6, auction: 20, multiplier: 'x1.2',
    },
    {
      id: 'magma', name: 'MAGMA', price: 299, icon: '★',
      desc: 'Раскалённая магма. Анархия — но деньги сильно не решают: решают руки и онлайн.',
      features: ['/kit magma', '/titul', '/uc menu', '/invsee', '/heal'],
      salary: 2000, homes: 20, regions: 7, auction: 24, multiplier: 'x1.2',
    },
    {
      id: 'inferno', name: 'INFERNO', price: 399, icon: '★',
      desc: 'Инферно. Анархия — но деньги сильно не решают: решают руки и онлайн.',
      features: ['/kit inferno', '/titul', '/uc menu', '/broadcast'],
      salary: 2500, homes: 25, regions: 8, auction: 24, multiplier: 'x1.5',
    },
    {
      id: 'phoenix', name: 'PHOENIX', price: 699, icon: '★',
      desc: 'Феникс. Анархия — но деньги сильно не решают: решают руки и онлайн.',
      features: ['/kit phoenix', '/titul', '/uc menu', '/changenick', '/time day/night', '/hat'],
      salary: 3000, homes: 35, regions: 9, auction: 30, multiplier: 'x1.5',
    },
    {
      id: 'obsidian', name: 'OBSIDIAN', price: 999, icon: '★',
      desc: 'Обсидиан. Анархия — но деньги сильно не решают: решают руки и онлайн.',
      features: ['/kit obsidian', '/titul', '/uc menu', '/fixall', '/fly', '/itemlore add', '/item name'],
      salary: 4000, homes: 50, regions: 10, auction: 32, multiplier: 'x1.75',
    },
    {
      id: 'blewxays', name: 'BLEWXAYS', price: 2499, icon: '★',
      desc: 'Легендарная привилегия сервера. Анархия — но деньги сильно не решают: решают руки и онлайн.',
      features: ['/kit blewxays', '/titul', '/uc menu'],
      salary: 5000, homes: 100, regions: 11, auction: 60, multiplier: 'x2.0',
    },
  ];

  const keyItems = [
    {
      id: 'donate_key', name: 'Ключ от донат-кейса', price: 69, icon: '⛏',
      desc: '1 ключ для донат-кейса. Анархия — но деньги сильно не решают: решают руки и онлайн.',
    },
  ];

  const houseItem = {
    id: 'house', name: 'Хаус', price: 1, icon: '☄',
    desc: '1 Хаус = 1 ₽. Внутриигровая валюта BLEWXAYS. Анархия — но деньги сильно не решают.',
  };

  const privatItems = [
    { id: 'p7', name: 'Приват 7x7', price: 199, icon: '🛡', desc: 'Блок привата 7x7. Анархия — но деньги сильно не решают.' },
    { id: 'p15', name: 'Приват 15x15', price: 499, icon: '🛡', desc: 'Блок привата 15x15. Анархия — но деньги сильно не решают.' },
    { id: 'p25', name: 'Приват 25x25', price: 999, icon: '🛡', desc: 'Блок привата 25x25. Анархия — но деньги сильно не решают.' },
    { id: 'p49', name: 'Приват 49x49', price: 1999, icon: '🛡', desc: 'Блок привата 49x49. Анархия — но деньги сильно не решают.' },
  ];

  const renderQtyControl = (id, max = 64) => {
    const qty = quantities[id] || 1;
    return (
      <div className="qty-control">
        <button className="qty-btn" onClick={() => setQuantities({ ...quantities, [id]: Math.max(1, qty - 1) })}>−</button>
        <input
          type="range"
          min="1"
          max={max}
          value={qty}
          onChange={(e) => setQuantities({ ...quantities, [id]: parseInt(e.target.value) })}
          className="qty-slider"
        />
        <span className="qty-value">{qty}</span>
        <button className="qty-btn" onClick={() => setQuantities({ ...quantities, [id]: Math.min(max, qty + 1) })}>+</button>
      </div>
    );
  };

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
          <div className="logo">BLEWXAYS</div>
          <p className="subtitle">Магазин • Анархия 1.21.11</p>
          <div className="links">
            <a href="https://blewxays-shop.vercel.app" target="_blank" rel="noreferrer">Сайт</a>
            <a href="https://discord.gg/wK8t4Xmec" target="_blank" rel="noreferrer">Discord</a>
            <a href="https://t.me/blewxays/" target="_blank" rel="noreferrer">Telegram</a>
          </div>
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
          <label className="nick-label" style={{ marginTop: '12px' }}>Валюта:</label>
          <select
            className="nick-input"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="RUB">₽ Рубли (RUB)</option>
            <option value="BYN">Br Белорусские рубли (BYN)</option>
            <option value="UAH">₴ Гривны (UAH)</option>
          </select>
          <p className="rate-note">Курс валют примерный — уточняйте у продавца в Telegram.</p>
        </div>

        {tab === 'houses' ? (
          <div className="grid">
            <div className="card">
              <div className="card-icon">{houseItem.icon}</div>
              <h2 className="card-title">{houseItem.name}</h2>
              <p className="card-desc">{houseItem.desc}</p>
              <div className="card-price">{formatPrice(houseItem.price)} <span>за 1 шт</span></div>
              {renderQtyControl('house', 1000)}
              <div className="card-total">
                Итого: {formatPrice(houseItem.price * (quantities['house'] || 1))}
              </div>
              <button className="buy-btn" onClick={() => buy(houseItem, quantities['house'] || 1)}>
                Купить
              </button>
            </div>
          </div>
        ) : (
          <div className="grid">
            {(tab === 'donate' ? donateItems : tab === 'keys' ? keyItems : privatItems).map(item => {
              const qty = quantities[item.id] || 1;
              const showQty = tab === 'keys';
              return (
                <div key={item.id} className="card">
                  <div className="card-icon">{item.icon}</div>
                  <h2 className="card-title">{item.name}</h2>
                  <p className="card-desc">{item.desc}</p>
                  {item.features && (
                    <ul className="card-features">
                      {item.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  )}
                  {item.salary !== undefined && (
                    <div className="card-info">
                      <div>Зарплата: {item.salary} ☄</div>
                      <div>Домов: {item.homes}</div>
                      <div>Регионов: {item.regions}</div>
                      <div>Слотов на аукционе: {item.auction}</div>
                      <div>Множитель скупщика: {item.multiplier}</div>
                    </div>
                  )}
                  <div className="card-price">{formatPrice(item.price)}</div>
                  {showQty && renderQtyControl(item.id, 64)}
                  {showQty && (
                    <div className="card-total">
                      Итого: {formatPrice(item.price * qty)}
                    </div>
                  )}
                  <button className="buy-btn" onClick={() => buy(item, showQty ? qty : 1)}>
                    Купить
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <footer className="footer">
          <p>© 2026 BLEWXAYS • <a href="https://blewxays-shop.vercel.app">blewxays-shop.vercel.app</a></p>
          <p style={{ marginTop: '10px' }}>Discord: <a href="https://discord.gg/wK8t4Xmec">discord.gg/wK8t4Xmec</a> • Telegram: <a href="https://t.me/blewxays/">t.me/blewxays</a></p>
          <p style={{ marginTop: '10px' }}>Оплата и выдача — через Telegram @polloplp</p>
        </footer>
      </div>
    </>
  );
}
