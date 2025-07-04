import React, { useState } from 'react';
// import '../styles/Buttons.css';

export default function AbilityScoresComponent() {
const [abilityScores, setAbilityScores] = useState({
  Strength: 10,
  Dexterity: 10,
  Constitution: 10,
  Intelligence: 10,
  Wisdom: 10,
  Charisma: 10,
});

const [pointPool, setPointPool] = useState(25);




  return (
    <>

    <h2>Ability Points: {pointPool}</h2>
    

    <div style={{ display: 'flex', gap: '20px' }}>

    <div>
    {Object.entries(abilityScores).map(([key, value]) => {

        return (
          <div className="ability-names" key={key}>
            <h2>{key}</h2>
          </div>
        );
      })}
      </div>

      <div>
      {Object.entries(abilityScores).map(([key, value]) => {

        return (
          <div className="ability-names" key={key}>
            <button type='button' className='ability-button'>-</button>
            <h2>{value}</h2>
            <button type='button' className='ability-button'>+</button>
          </div>
        );
      })}
      </div>
      
    </div>
    </>
  );
}
