import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateCharacter.css';


const CharacterView = () => {
    const { id } = useParams();
    const [build, setBuild] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchBuild = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/character-build/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response.data);
        setBuild(response.data);
      } catch (error) {
        console.error('Error fetching build:', error);
      }
    };

    fetchBuild();
  }, [id]);
    

    return (
        <>
        <Navbar/>
         <form className="character-form">
        <div>
            {build ? (
            <>
            {build.image ? (<h2>Image</h2>): <h2>No Image</h2> }
                <h2>{build.name}</h2>
                <p><strong>Class:</strong> {build.class_name}</p>
                <p><strong>Deity:</strong> {build.deity_name}</p>
            </>
            ) : (
            <p>Loading...</p>
            )}
        </div>
        </form>
        </>
    );


}

export default CharacterView;