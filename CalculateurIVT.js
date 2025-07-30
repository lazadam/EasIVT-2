// src/CalculateurIVT.js
import React, { useState } from 'react';

function CalculateurIVT() {
  const [startDate, setStartDate] = useState('');
  const [protocol, setProtocol] = useState('fixed');
  const [dates, setDates] = useState([]);

  const calculateDates = () => {
    const start = new Date(startDate);
    const newDates = [];

    if (!startDate) return;

    switch (protocol) {
      case 'fixed':
        for (let i = 0; i < 6; i++) {
          const nextDate = new Date(start);
          nextDate.setMonth(start.getMonth() + i);
          newDates.push(nextDate.toISOString().slice(0, 10));
        }
        break;

      case 'loading':
        for (let i = 0; i < 3; i++) {
          const nextDate = new Date(start);
          nextDate.setDate(start.getDate() + i * 30);
          newDates.push(nextDate.toISOString().slice(0, 10));
        }
        break;

      case 'te':
        for (let i = 0; i < 6; i++) {
          const nextDate = new Date(start);
          nextDate.setDate(start.getDate() + i * (30 + i * 7)); // ex : +30, +37, +44, etc.
          newDates.push(nextDate.toISOString().slice(0, 10));
        }
        break;

      default:
        break;
    }

    setDates(newDates);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Calculateur IVT</h2>
      <label>Date de la première injection :</label>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <br /><br />

      <label>Protocole :</label>
      <select value={protocol} onChange={e => setProtocol(e.target.value)}>
        <option value="fixed">Mensuel (Fixed)</option>
        <option value="loading">Loading dose</option>
        <option value="te">Treat & Extend</option>
      </select>
      <br /><br />

      <button onClick={calculateDates}>Générer les dates</button>

      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
}

export default CalculateurIVT;
