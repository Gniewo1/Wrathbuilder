import React, { useEffect, useState } from 'react';
import axios from 'axios';

const  LoadButtons = () => {
  const [builds, setBuilds] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');



    const fetchBuilds = async () => {
      try {
        const response = await axios.get('http://localhost:8000/character-build/', {
          headers: {
            Authorization: `Token ${token}`, // Or Bearer if using JWT
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
    <div>
      <h1>Your Character Builds</h1>
      <ul className="build-list">
        {builds.map(build => (
            <li key={build.id} className="build-item">
            <button
                className="build-button"
                onClick={() => console.log(`Clicked build ${build.name}`)} // or navigate(`/builds/${build.id}`)
            >
                <h3>{build.name}</h3>
                <p><strong>Class:</strong> {build.class_name}</p>
                <p><strong>Deity:</strong> {build.deity_name}</p>
            </button>
            </li>
        ))}
        </ul>
    </div>
  );
};

export default  LoadButtons;