import React, { useState } from 'react';
// import '../styles/Buttons.css';

export default function AbilityScoresComponent({choose_bonus}) {
const [abilityScores, setAbilityScores] = useState({
  Strength: 10,
  Dexterity: 10,
  Constitution: 10,
  Intelligence: 10,
  Wisdom: 10,
  Charisma: 10,
});

const [pointPool, setPointPool] = useState(25);

//// Buttons functions
const decreaseAbility = (abilityName) => {
  const currentScore = abilityScores[abilityName];
  const cost = getPointCostDecrease(currentScore);
  const newPool = pointPool + cost;

  if (currentScore <= 7) {
    return; // nie można zwiększyć
  }

  setPointPool(newPool);
  setAbilityScores(prev => ({
    ...prev,
    [abilityName]: currentScore - 1,
  }));
};

const increaseAbility = (abilityName) => {
  const currentScore = abilityScores[abilityName];
  const cost = getPointCostIncrease(currentScore);
  const newPool = pointPool - cost;

  if (currentScore >= 18 || newPool < 0) {
    return;
  }

  setPointPool(newPool);
  setAbilityScores(prev => ({
    ...prev,
    [abilityName]: currentScore + 1,
  }));
};


//// point cost calculations
const getPointCostIncrease = (score) => {
  if (score === 7) return 2;
  if (score >= 8 && score <= 12) return 1;
  if (score >= 13 && score <= 14) return 2;
  if (score >= 15 && score <= 16) return 3;
  if (score >= 17) return 4;
  return 0;
};

const getPointCostDecrease = (score) => {
  if(score ===18) return 4;
  if(score <= 17 && score >= 16) return 3;
  if(score <= 15 && score >=14) return 2;
  if(score <= 13 && score >=9) return 1;
  if(score ===8) return 2;
  return 0;
};


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
            <button type='button' className='ability-button' onClick={() => decreaseAbility(key)}>-</button>
            <h2>{value}</h2>
            <button type='button' className='ability-button' onClick={() => increaseAbility(key)}>+</button>
          </div>
        );
      })}

      <div>
        {choose_bonus === true ? <p>Choose Bonus</p> : null}
      </div>

      </div>


      
    </div>
    </>
  );
}
