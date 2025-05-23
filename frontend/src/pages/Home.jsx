import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
// import { LogOut } from '../functions/LogOut';
import Login from '../components/Login';
import HomepageButtons from '../components/HomepageButtons';
import '../styles/Buttons.css';

const Home = () => {
   
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
      <Navbar />
      {isAuthenticated ?
        <HomepageButtons/>
      : 
      <Login/>}
    </>

     
    );
  };
  
  export default Home;