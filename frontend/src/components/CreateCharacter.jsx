import React, { useState } from 'react';
import axios from 'axios';

const CreateCharacter = () => {
  const [name, setName] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post('/builds/create/', { name }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`,
        }
      });
      alert('Character created!');
      setName('');
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCharacter;