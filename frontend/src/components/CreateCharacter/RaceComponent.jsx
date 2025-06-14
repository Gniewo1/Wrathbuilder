import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This component is showing info about race with given id of this race
export default function RaceComponent({ id }) {
  const [raceDetails, setRaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // If no id is provided, don't fetch

    setLoading(true);
    setError(null);

    // Fetch race details using the provided `id`
    axios
      .get(`http://localhost:8000/fetch-race/${id}/`)
      .then((response) => {
        // console.log('Fetched race details:', response.data);
        setRaceDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching race details:', err);
        setError('Failed to load race details.');
        setLoading(false);
      });
  }, [id]); // Re-run the effect when the `id` changes

  if (loading) {
    return <div>Loading race details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!raceDetails) {
    return <div>No race details available</div>;
  }

  return (
    <div>
      <h2>{raceDetails.name}</h2>
      
  
      {raceDetails.image && (
        <img
          src={`http://localhost:8000${raceDetails.image}`}
          alt={raceDetails.name}
          style={{ maxWidth: '300px', height: 'auto' }}
        />
      )}
  
    <h3>Ability Score Bonuses:</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {raceDetails.strength_bonus !== 0 && (
            <li>Strength: {raceDetails.strength_bonus > 0 ? '+' : ''}{raceDetails.strength_bonus}</li>
        )}
        {raceDetails.dexterity_bonus !== 0 && (
            <li>Dexterity: {raceDetails.dexterity_bonus > 0 ? '+' : ''}{raceDetails.dexterity_bonus}</li>
        )}
        {raceDetails.constitution_bonus !== 0 && (
            <li>Constitution: {raceDetails.constitution_bonus > 0 ? '+' : ''}{raceDetails.constitution_bonus}</li>
        )}
        {raceDetails.intelligence_bonus !== 0 && (
            <li>Intelligence: {raceDetails.intelligence_bonus > 0 ? '+' : ''}{raceDetails.intelligence_bonus}</li>
        )}
        {raceDetails.wisdom_bonus !== 0 && (
            <li>Wisdom: {raceDetails.wisdom_bonus > 0 ? '+' : ''}{raceDetails.wisdom_bonus}</li>
        )}
        {raceDetails.charisma_bonus !== 0 && (
            <li>Charisma: {raceDetails.charisma_bonus > 0 ? '+' : ''}{raceDetails.charisma_bonus}</li>
        )}
        {raceDetails.choose_bonus && <li>+ 2 to Any</li>}
        </ul>
        <h3>Description:</h3>
        <p>{raceDetails.description}</p>
    </div>
  );
}