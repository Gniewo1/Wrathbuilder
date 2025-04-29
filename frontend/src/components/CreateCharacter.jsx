import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Select.css';
import RaceComponent from './RaceComponent';

const CreateCharacter = () => {
  const [name, setName] = useState('');
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    // Fetch races
    fetch('http://localhost:8000/race-names/')
      .then((res) => res.json())
      .then((data) => setRaces(data))
      .catch((err) => console.error('Error fetching races:', err));

    // Fetch classes
    fetch('http://localhost:8000/classes')
    .then((res) => res.json())
    .then((data) => {
      setClasses(data);
    })
    .catch((err) => console.error('Error fetching classes:', err));
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
            // race={
            //   races.find((r) => r.id.toString() === selectedRace)?.id || 'Unknown'
            // }
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
            {classes.map((cls) => {
              // Handle allowed_alignments, default to "ANY" if empty
              const allowedAlignments = cls.allowed_alignments && cls.allowed_alignments.length > 0
                ? cls.allowed_alignments.join(', ') // Assuming it's an array of strings
                : 'ANY';

              // Check if class_skills is an array, and join if it is
              const classSkills = Array.isArray(cls.class_skills) ? cls.class_skills.join(', ') : 'N/A'; // Default to 'N/A' if not an array

              const classInfo = `${cls.name} (Hit Die: ${cls.hit_die}, Skill Points: ${cls.skill_points}, ` +
                `Class Skills: ${classSkills}, Allowed Alignments: ${allowedAlignments})`;

              return (
                <option key={cls.id} value={cls.id}>
                  {classInfo}
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