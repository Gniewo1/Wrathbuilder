import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const  LoadButtons = () => {
  const [builds, setBuilds] = useState([]);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const token = localStorage.getItem('token');



    const fetchBuilds = async () => {
      try {
        const response = await axios.get('http://localhost:8000/character-build/', {
          headers: {
            Authorization: `Token ${token}`, 
          }
        });
        setBuilds(response.data);
      } catch (error) {
        console.error('Error fetching builds:', error);
      }
    };

    fetchBuilds();
  }, []);

  return (
    <>
    <div>
      <h1>Your Character Builds</h1>
      <ul className="build-list">
        {builds.map(build => (
            <li key={build.id} className="build-item">
            <button
                className="build-button"
                onClick={() => navigate(`/builds/${build.id}`)}
            >
          <div style={{ display: 'flex' }}>
            {/* Lewa kolumna – zdjęcie */}
            <div>
              <img
                src={build.image}
                alt={build.name}
                style={{ maxWidth: '300px', height: 'auto' }}
              />
            </div>

            {/* Prawa kolumna – wycentrowany tekst */}
            <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div>
                <h1>Name: {build.name}</h1>
                <h2>Class: {build.class_name}</h2>
                <h2>Deity: {build.deity_name}</h2>
              </div>
            </div>
          </div>

            </button>
            </li>
        ))}
        </ul>
    </div>

    </>
  );
};

export default  LoadButtons;