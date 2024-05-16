// src/components/login/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); // Use useNavigate

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const adminCredentials = [
    { email: 'mrunali@gmail.com', password: '123456' },
    { email: 'p@gmail.com', password: '234567' },
    { email: 'a@gmail.com', password: '345678' }
  ];
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if entered email and password match any admin credentials
    const isAdmin = adminCredentials.some(
      (admin) => admin.email === email && admin.password === password
    );

    if (!isAdmin) {
      setEmailError('Invalid email or password');
      setPasswordError('Invalid email or password');
      return;
    }

    // Clear errors
    setEmailError('');
    setPasswordError('');

    onLogin({ email, password });

    // Navigate to the Dashboard after a successful login
    navigate('/Dashboard');

    // Clear the form fields
    setEmail('');
    setPassword('');
  };
  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   // Validate email and password (you can replace this logic with your validation)
  //   if (!isValidEmail(email)) {
  //     setEmailError('Please enter a valid email');
  //     return;
  //   } else {
  //     setEmailError('');
  //   }

  //   if (!isValidPassword(password)) {
  //     setPasswordError('Please enter a valid password');
  //     return;
  //   } else {
  //     setPasswordError('');
  //   }

  //   onLogin({ email, password });

  //   // Navigate to the Dashboard after a successful login
  //   navigate('/Dashboard');

  //   // Clear the form fields
  //   setEmail('');
  //   setPassword('');
  // };

  const isValidEmail = (email) => {
    // You can replace this validation logic with a more comprehensive one
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    // You can replace this validation logic with a more comprehensive one
    return password.length >= 6;
  };

  return (
    <div className="login-container">
      <div className="red-section">
        <img
          className="suntech"
          alt="Suntech"
          src="src\assets\suntech_corporation.png"
          style={{ width: '85px', height: 'auto' }} // Adjust the width as needed
        />
        <img
          className="providingass"
          src="src\assets\providing assitance.png"
          style={{ width: '110px', height: 'auto' }}
          alt="providing assistance"
        />

        <img
          className="suntech-content"
          src="src\assets\Suntech Corporation.png"
          style={{ width: '160px', height: 'auto' }}
          alt="suntech-content"
        />

        <div className="welcome-box">
          <img className="Ellipse3" alt="Ellipse3" src="src\assets\Ellipse 3 (1).png" />
          <img className="Ellipse4" alt="Ellipse4" src="src\assets\Ellipse 4 (1).png" />
          <img className="center-image" alt="Center Image" src="src\assets\Frame 617.png" />
          <div className="welcome-text">
            {/* <h1>Welcome</h1> */}
          </div>
          <div className="login-text">
            {/* <p>Login to continue access</p> */}
          </div>
        </div>
      </div>
      <div className="white-section">
        <div className="login-form">
          <h2>Login as an Admin</h2>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter a valid email"
                required
              />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter a valid password"
                required
              />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
