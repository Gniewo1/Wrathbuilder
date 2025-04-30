import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Select.css';
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

  useEffect(() => {
    // Fetch races names
    fetch('http://localhost:8000/race-names/')
      .then((res) => res.json())
      .then((data) => setRaces(data))
      .catch((err) => console.error('Error fetching races:', err));

    // Fetch classes names
    fetch('http://localhost:8000/class-names/')
    .then((res) => res.json())
    .then((data) => {
      setClasses(data);
    })
    .catch((err) => console.error('Error fetching classes:', err));

    // Fetch alignment names
    fetch('http://localhost:8000/alignment-names/')
    .then((res) => res.json())
    .then((data) => {
      setAlignment(data);
    })
    .catch((err) => console.error('Error fetching alignment:', err));

    // Fetch background names
    fetch('http://localhost:8000/background-names/')
    .then((res) => res.json())
    .then((data) => {
      setBackgrounds(data);
    })
    .catch((err) => console.error('Error fetching Backgrounds:', err));

    // Fetch deity names
    fetch('http://localhost:8000/deity-names/')
    .then((res) => res.json())
    .then((data) => {
      setDeities(data);
    })
    .catch((err) => console.error('Error fetching Deities:', err));






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

        {/* Putting name */}
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
            {races.map((race) => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </select>
        </label>

        {/* This changes info and image of races */}
        {selectedRace && (
          <RaceComponent
            id={selectedRace}
          />
        )}



        {/* Class selection dropdown */}
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

          {/* This changes info of classes */}
                {selectedClass && (
          <ClassComponent
            id={selectedClass}
          />
        )}

        {/* Alignment Selection */}
        <label>
          Alignment:
          <select
            value={selectedAlignment}
            onChange={(e) => setSelectedAlignment(e.target.value)}
            required
            className="styled-select"
          >
            <option value="">-- Select Alignment --</option>
            {alignments.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </label>


      {/* Background Selection */}
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

        {/* This changes info of background */}
        {selectedBackground && (
          <BackgroundComponent
            id={selectedBackground}
          />
        )}


        {/* Deity Selection */}
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

        {/* This changes info of deity */}
        {selectedDeity && (
          <DeityComponent
            id={selectedDeity}
          />
        )}

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCharacter;