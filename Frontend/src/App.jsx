// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/login/login';
import DeviceForm from './components/DeviceForms/deviceform'; // Import the DeviceForm component
import Prediction from './components/Prediction/Prediction';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (credentials) => {
    // In a real application, you would perform authentication here
    // For simplicity, let's just check if both username and password are non-empty
    if (credentials.email && credentials.password) {
      setIsLoggedIn(true);
      console.log('Login successful!'); // Replace with actual authentication logic
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/predict"
          element={isLoggedIn ? <Prediction /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/device-form"
          element={isLoggedIn ? <DeviceForm /> : <Navigate to="/" />}
        />
        {/* Add routes for other components/pages as needed */}
      </Routes>
    </Router>
  );
};

export default App;
