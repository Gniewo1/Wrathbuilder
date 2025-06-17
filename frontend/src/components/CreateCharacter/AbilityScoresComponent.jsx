import React, { useState } from 'react';
// import '../styles/Buttons.css';

export default function AbilityScoresComponent({ scores, setScores }) {
  const { pointPool, str, dex, con, int: intelligence, wis, cha } = scores;

  const statStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  };

  const handleStatChange = (statName, delta) => {
    console.log("handleStatChange called with:", statName, delta);
    const currentValue = scores[statName];
    const newValue = currentValue + delta;
    const cost = delta;

    if (pointPool - cost < 0 || newValue < 7 || newValue > 18) return;

    setScores({
      ...scores,
      [statName]: newValue,
      pointPool: pointPool - cost,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Point Pool: {pointPool}</h2>

      {['str', 'dex', 'con', 'int', 'wis', 'cha'].map((stat) => {
        const label = stat === 'int' ? 'Intelligence' : stat.charAt(0).toUpperCase() + stat.slice(1);
        return (
          <div key={stat} style={statStyle}>
            <span>{label}:</span>
            <button type="button" className="stat-button" onClick={() => handleStatChange(stat, 1)}>+</button>
            <span>{scores[stat]}</span>
            <button type="button" className="stat-button" onClick={() => handleStatChange(stat, -1)}>-</button>
          </div>
        );
      })}
    </div>
  );
}
