import { useState, useEffect } from 'react'
import './App.css'
import Register from './pages/Register'
import Home from './pages/Home'
import NewCharacter from './pages/NewCharacter'
import LoadCharacter from './pages/LoadCharacter'
import ViewCharacter from './pages/ViewCharacter'
import {Routes, Route, Navigate} from 'react-router-dom'
import axios from 'axios'

function App() {

  //Check authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Check if the token is valid by calling a protected route
          const config = {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          };

          const res = await axios.get('http://localhost:8000/api/auth/user/', config);

          if (res.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (err) {
          // If token is invalid, remove it from localStorage and set auth to false
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
    };

    checkIfLoggedIn();
  }, []);
  // Authentication ends

  return (
    <>

    
    <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register/>} />
     <Route path="/newcharacter" element={<NewCharacter/>} />
     <Route path="/loadcharacter" element={<LoadCharacter/>} />
     <Route path="/character" element={<ViewCharacter/>} />

    </Routes>
    </>
  )

}

export default App
