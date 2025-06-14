import React, { useState, useEffect } from 'react';
import RaceComponent from './RaceComponent';

const Race = () => {
    const [races, setRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState('');

     useEffect(() => {
        fetch('http://localhost:8000/race-names/')
          .then((res) => res.json())
          .then((data) => setRaces(data))
          .catch((err) => console.error('Error fetching races:', err));
            }, []);
    
    

    return (
        <>
        <label>
          Race:
          <select
            value={selectedRace}
            onChange={(e) => setSelectedRace(e.target.value)}
            required
            className="styled-select"
          >
            <option value="">-- Select Race --</option>
            {races.map((race) => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </select>

          {selectedRace && <RaceComponent id={selectedRace} />}
        </label>
        </>

    );


}

export default Race;