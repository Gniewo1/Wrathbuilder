import React, { useState } from 'react';
// import '../styles/Buttons.css';

export default function AbilityScoresComponent() {

    const [scores, setScores] = React.useState({
    strength: 10, dexterity: 10, constitution: 10, inteligence: 10, wisdom: 10, charisma: 10
  });
    const [pointPool, setPointPool] = React.useState(25);

    const handleStatChange = (stat, delta) => {
    console.log('Clicked:', stat, delta);
    setScores(prev => ({
      ...prev,
      [stat]: prev[stat] + delta,
    }));
    setPointPool(p => p - delta);
  };



  
  const statStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  };




  return (
   <div style={{ padding: '20px' }}>
      <h2>Point Pool: {pointPool}</h2>
      {['strength', 'dexterity', 'constitution', 'inteligence', 'wisdom', 'charisma'].map((stat) => {
        const label = stat.charAt(0).toUpperCase() + stat.slice(1);
        return (
          <div key={stat} style={statStyle}>
            <span className="stat-label">{label}:</span>
            <button type="button" onClick={() => handleStatChange(stat, -1)}>-</button>
            <span className="stat-label">{scores[stat]}</span>
            <button type="button" onClick={() => handleStatChange(stat, 1)}>+</button>
            
          </div>
        );
      })}
    </div>
  );
}
