import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DeityComponent({ id }) {
  const [deityDetails, setDeityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8000/fetch-deity/${id}/`)
      .then((response) => {
        setDeityDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching deity details:', err);
        setError('Failed to load deity details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading deity details...</div>;
  if (error) return <div>{error}</div>;
  if (!deityDetails) return <div>No deity details available</div>;

  return (
    <div>
      <h2>{deityDetails.name}</h2>
      {deityDetails.image && (
        <img
          src={`http://localhost:8000${deityDetails.image}`}
          alt={deityDetails.name}
          style={{ maxWidth: '200px', height: 'auto' }}
        />
      )}
      <h3>Allowed Alignments:</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {deityDetails.allowed_alignments.map((alignment, index) => (
          <li key={index}><strong>{alignment}</strong></li>
        ))}
      </ul>
      <h3>Description:</h3>
      <p>{deityDetails.description}</p>
    </div>
  );
}