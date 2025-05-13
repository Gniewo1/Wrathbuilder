import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Select.css';
import '../styles/CreateCharacter.css';
import RaceComponent from './RaceComponent';
import ClassComponent from './ClassComponent';
import BackgroundComponent from './BackgroundComponent';
import DeityComponent from './DeityComponent';

const CreateCharacter = () => {
  const [name, setName] = useState('');
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [alignments, setAlignment] = useState([]);
  const [selectedAlignment, setSelectedAlignment] = useState('');
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState('');
  const [deities, setDeities] = useState([]);
  const [selectedDeity, setSelectedDeity] = useState('');
  const [backstory, setBackstory] = useState('');

  const [deityAlignments, setDeityAlignments] = useState([]);
  const [classAlignments, setClassAlignments] = useState([]);
  
  const handleAlignmentChange = (e) => {
    const selectedId = e.target.value;  // The selected alignment id
    setSelectedAlignment(selectedId);   // First task: Update selected alignment
  };


  const isValidAlignment = 
  (deityAlignments.includes(selectedAlignment) || deityAlignments.includes('ANY')) &&
  (classAlignments.includes(selectedAlignment) || classAlignments.includes('ANY'));

  useEffect(() => {
    fetch('http://localhost:8000/race-names/')
      .then((res) => res.json())
      .then((data) => setRaces(data))
      .catch((err) => console.error('Error fetching races:', err));

    fetch('http://localhost:8000/class-names/')
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error('Error fetching classes:', err));

    fetch('http://localhost:8000/alignment-names/')
      .then((res) => res.json())
      .then((data) => setAlignment(data))
      .catch((err) => console.error('Error fetching alignment:', err));

    fetch('http://localhost:8000/background-names/')
      .then((res) => res.json())
      .then((data) => setBackgrounds(data))
      .catch((err) => console.error('Error fetching Backgrounds:', err));

    fetch('http://localhost:8000/deity-names/')
      .then((res) => res.json())
      .then((data) => setDeities(data))
      .catch((err) => console.error('Error fetching Deities:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // Or wherever your token is stored
    if (!token) {
      alert('You must be logged in to create a character build.');
      return;
    }
  
    const buildData = {
      name,
      race: selectedRace,
      first_class: selectedClass,
      alignment: selectedAlignment,
      background: selectedBackground,
      deity: selectedDeity || null,
      // mythic_path: 
      backstory
    };
  
    try {
      const response = await fetch('http://localhost:8000/create-character/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(buildData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Character build created successfully!');
        // Optionally reset form or redirect
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting build:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <div className="empty-container"></div>
      <h1>Create New Character</h1>
      <form onSubmit={handleSubmit} className="character-form">
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
        </label>

        {selectedRace && <RaceComponent id={selectedRace} />}


        <label>
          Class:
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
            className="styled-select"
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </label>


        {selectedClass && (
          <ClassComponent
            id={selectedClass}
            setAllowedAlignments={setClassAlignments}
          />
        )}

              </form>
              <form onSubmit={handleSubmit} className="character-form">

        <label>
          Alignment:
          <select
            value={selectedAlignment}
            onChange={(e) => handleAlignmentChange(e)}
            required
            className="styled-select"
          >
            <option value="">-- Select Alignment --</option>
            {alignments.map((cls) => (
              <option key={cls.name} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>
        </label>




        <label>
          Background:
          <select
            value={selectedBackground}
            onChange={(e) => setSelectedBackground(e.target.value)}
            required
            className="styled-select"
          >
            <option value="">-- Select Background --</option>
            {backgrounds.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </label>

        {selectedBackground && <BackgroundComponent id={selectedBackground} />}

        <label>
          Deity:
          <select
            value={selectedDeity}
            onChange={(e) => setSelectedDeity(e.target.value)}
            required
            className="styled-select"
          >
            <option value="">-- Select Deity --</option>
            {deities.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </label>

        {selectedDeity && (
          <DeityComponent
            id={selectedDeity}
            setAllowedAlignments={setDeityAlignments}
          />
        )}


          <label>
            Backstory:
          
            <textarea 
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
              rows={5}
              placeholder="Enter character's backstory here..."
              className="styled-textarea"
            />
          </label>


          <div>
          {/* <h3>Chosen Alignment: {selectedAlignment}</h3> */}
          {!selectedAlignment ? (
            <p>Please select an alignment.</p>
          ) : isValidAlignment ? (
            <p style={{ color: 'green' }}>✅ This alignment is allowed by both deity and class.</p>
          ) : (
            <p style={{ color: 'red' }}>❌ This alignment is not allowed by either the deity or the class.</p>
          )}
        </div>
        <button type="submit" disabled={!isValidAlignment}>Create</button>
      </form>
    </div>
  );
};

export default CreateCharacter;