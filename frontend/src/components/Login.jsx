import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Auth-Form.css';
import '../styles/Body.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  // const navigate = useNavigate();


  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, password });

    try {
      const res = await axios.post('http://localhost:8000/api/login/', body, config);
      console.log('Login Successful:', res.data);
      localStorage.setItem('token', res.data.token);

      window.location.reload();

    } catch (err) {
      console.error(err.response.data);
      
    }
  };

  return (
    <>

    <Navbar />
    <form onSubmit={onSubmit} className="auth-form">
    <input
      type="text"
      placeholder="Username"
      name="username"
      value={username}
      onChange={onChange}
      required
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      value={password}
      onChange={onChange}
      required
    />
    <button type="submit">Login</button>
  </form>
    </>
  );
};

export default Login;