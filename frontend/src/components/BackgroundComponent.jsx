import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This component displays information about a background given its ID
export default function BackgroundComponent({ id }) {
  const [backgroundDetails, setBackgroundDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8000/fetch-background/${id}/`)
      .then((response) => {
        setBackgroundDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching background details:', err);
        setError('Failed to load background details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading background details...</div>;
  if (error) return <div>{error}</div>;
  if (!backgroundDetails) return <div>No background details available</div>;

  return (
    <div>
      <h2>{backgroundDetails.name}</h2>
      <h3>Description:</h3>
      <p>{backgroundDetails.description}</p>
    </div>
  );
}