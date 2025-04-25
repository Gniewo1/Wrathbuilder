import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import '../styles/Navbar.css';
import { CheckAuthentication } from '../functions/CheckAuthentication';
import { LogOut } from '../functions/LogOut';
import { useState, useEffect } from 'react'




const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await LogOut();

    if (success) {
      // Redirect to homepage after successful logout
      navigate('/');
      window.location.reload();
    } else {
      // Handle logout failure (e.g., show an error message)
      console.error('Logout failed');
    }
  };

  useEffect(() => {
    const verifyAuthentication = async () => {
      const authenticated = await CheckAuthentication();
      setIsAuthenticated(authenticated);
    };

    verifyAuthentication();
  }, []);

  




  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">WrathBuilder</Link>
      </div>
      
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            {/* <li>
              <Link to="/login">Login</Link>
            </li> */}
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;