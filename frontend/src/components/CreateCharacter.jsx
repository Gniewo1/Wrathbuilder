import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Select.css';

const CreateCharacter = () => {
  const [name, setName] = useState('');
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/races/')
      .then((res) => res.json())
      .then((data) => setRaces(data))
      .catch((err) => console.error('Error fetching races:', err));
      console.log(races)
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post('/builds/create/', { name, race: selectedRace }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
      });
      alert('Character created!');
      setName('');
      setSelectedRace('');
    } catch (error) {
      console.error('Error creating character:', error);
      alert('Failed to create character.');
    }
  };

  return (
    <div>
      <h2>Create New Character</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Character Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        {/* Race selection dropdown */}
        <label>
          Race:
            <select
            value={selectedRace}
            onChange={(e) => setSelectedRace(e.target.value)}
            required
            className="styled-select"
            >
            <option value="">-- Select Race --</option>
            {races.map((race) => {
                const bonuses = [
                race.strength_bonus !== 0 ? `${race.strength_bonus > 0 ? '+' : ''}${race.strength_bonus} STR` : null,
                race.dexterity_bonus !== 0 ? `${race.dexterity_bonus > 0 ? '+' : ''}${race.dexterity_bonus} DEX` : null,
                race.constitution_bonus !== 0 ? `${race.constitution_bonus > 0 ? '+' : ''}${race.constitution_bonus} CON` : null,
                race.intelligence_bonus !== 0 ? `${race.intelligence_bonus > 0 ? '+' : ''}${race.intelligence_bonus} INT` : null,
                race.wisdom_bonus !== 0 ? `${race.wisdom_bonus > 0 ? '+' : ''}${race.wisdom_bonus} WIS` : null,
                race.charisma_bonus !== 0 ? `${race.charisma_bonus > 0 ? '+' : ''}${race.charisma_bonus} CHA` : null,
                race.choose_bonus ? `+2 ANY` : null,
                ]
                .filter(Boolean)
                .join(', ');

                return (
                <option key={race.id} value={race.id}>
                    {race.name} {bonuses && `(${bonuses})`}
                </option>
                );
            })}
            </select>
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCharacter;