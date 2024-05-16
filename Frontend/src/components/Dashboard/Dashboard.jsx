
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import HorizontalBarGraph from './horizontalBar';
import Graphs from '../Graphs/Graphs'; // Adjust the path as needed
import TotalMeter from './TotalMeter';
import MaxConsumption from './maxconsumption';
import PF from './Pf';
import GroupConsumption from './groupconsumption';
import DeviceForm from '../DeviceForms/deviceform';
import Prediction from '../Prediction/Prediction';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showGraphsSection, setShowGraphsSection] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [dashboardKey, setDashboardKey] = useState(0);

  const [showPrediction, setShowPrediction] = useState(false);


  const onLogoutClick = () => {
    // Implement your logout logic here
    // For now, navigate to the home page ("/")
    navigate('/');
  };

  const handleRefresh = () => {
    // Implement logic to refresh dashboard content here
    window.location.reload();
  };

  const handleGraphsSectionClick = () => {
    setShowGraphsSection(true);
    setShowNotifications(false);
    setShowUserProfile(false);
    setWelcomeMessage('Welcome to Graphs & Analysis section!');
    setSelectedOption('graphs');
    // You can add more logic or fetch data specific to this section if needed
  };

  const handleBellIconClick = () => {
    setShowNotifications(!showNotifications);
    setShowUserProfile(false);
    setWelcomeMessage('Welcome to Notifications section!');
  };

  const handleUserProfileClick = () => {
    setShowUserProfile(!showUserProfile);
    setShowNotifications(false);
    setWelcomeMessage('Welcome to User Profile section!');
  };

  const handleMeterReviewClick = () => {
    navigate('/meter-review');
    setWelcomeMessage('Welcome to Meter Review section!');
    setSelectedOption('meterReview');
  };

  const handleSettingsClick = () => {
    setWelcomeMessage('Welcome to Settings section!');
    setSelectedOption('settings');
    setShowGraphsSection(false);
    setShowNotifications(false);
    setShowUserProfile(false);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setWelcomeMessage('Welcome to Dashboard section!');
    setSelectedOption('dashboard');
  };

  // const handlePredictionClick = () => {
  //   navigate('/prediction');
  //   setWelcomeMessage('Welcome Prediction section!');
  //   setSelectedOption('prediction');
  //   setShowPrediction(true);
  // };
  const handlePredictionClick = () => {
    window.location.href = 'http://127.0.0.1:5000';
    setWelcomeMessage('Welcome Prediction section!');
    setSelectedOption('prediction');
    setShowPrediction(true);
  };
  

  useEffect(() => {
    // Set the initial selected option to 'dashboard' when the component mounts
    setSelectedOption('dashboard');
  }, []); // Empty dependency array ensures the effect runs only once

  const [contentHeight, setContentHeight] = useState(0);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const updateSidebarHeight = () => {
      const newContentHeight = document.querySelector('.content').offsetHeight;
      setContentHeight(newContentHeight);
    };

    updateSidebarHeight(); // Set initial height

    window.addEventListener('resize', updateSidebarHeight);
    return () => window.removeEventListener('resize', updateSidebarHeight);
  }, []);

  return (
    <div className="dashboard">
      <div ref={sidebarRef} className="navbar" style={{ height: `${contentHeight}px` }}>
        <img
          className='suntech-text'
          src="src\assets\Suntech Corporation.png"
          style={{ width: '145px', height: 'auto' }}
          alt="suntech corporation"
        />
        <img
          className='providing-assistance'
          src="src\assets\providing assitance.png"
          style={{ width: '125px', height: 'auto' }}
          alt="providing assistance"
        />
        <img
          className='suntech-image'
          src="src\assets\suntech_corporation.png"
          style={{ width: '85px', height: 'auto' }}
          alt="suntech-image"
        />

        <div
          className={`dashboard-link ${selectedOption === 'dashboard' ? 'selected' : ''}`}
          onClick={handleDashboardClick}
        >
          Dashboard
        </div>
        <div
          className={`dashboard-link ${selectedOption === 'meterReview' ? 'selected' : ''}`}
          onClick={handleMeterReviewClick}
        >
          Meter Review
        </div>
        <div
          className={`dashboard-link ${selectedOption === 'settings' ? 'selected' : ''}`}
          onClick={handleSettingsClick}
        >
          Meter Info
        </div>
        <div
          className={`dashboard-link ${selectedOption === 'graphs' ? 'selected' : ''}`}
          onClick={handleGraphsSectionClick}
        >
          Graphs & Analysis
        </div>

        <div
          className={`dashboard-link ${selectedOption === 'prediction' ? 'selected' : ''}`}
          onClick={handlePredictionClick}
        >
          Prediction
        </div>

       

        {/* <button className="refresh-button" onClick={handleRefresh}>
          Refresh
        </button> */}

        <div className="notification-icon" onClick={handleBellIconClick}>
          <img src="src\assets\Group 342.png" alt="Bell Icon" className="bell-icon" />
        </div>

        <div className="user-profile" onClick={handleUserProfileClick}>
          <img src="src\assets\Rectangle 3.png" alt="User Profile" className="user-avatar" />
        </div>
        <div className="logout-container">
          <button onClick={onLogoutClick}>Logout</button>
        </div>

        {selectedOption === 'deviceForm' && (
          <div className="device-form-section">
            <DeviceForm />
          </div>
        )}
      </div>

      <div className="content">
        <p className="dashboard-title">
          <img src="src\assets\Complete Energy Meter Monitoring Systems - EMS.png" alt="Dashboard Title" />
        </p>
        <hr className="faint-line" />
        {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}

        {selectedOption === 'dashboard' && (
          <div className="dashboard-section">
            <div className="row">
            <HorizontalBarGraph />
            <MaxConsumption />
            <PF />
            </div>
            
            <TotalMeter />
            <GroupConsumption/>
  
          </div>
          
        )}

        {selectedOption === 'graphs' && showGraphsSection && (
          <div className="graphs-analysis-section">
            <h2>Graphs & Analysis</h2>
            <Graphs />
          </div>
        )}

       {selectedOption === 'prediction' && showPrediction && (
          <div>
            <h2>Prediction</h2>
            <Prediction />
          </div>
        )}

      {selectedOption === 'notifications' && showNotifications && (
        <div className="notifications-section">
          {/* Render content specific to the Notifications section here */}
          <p>You have new notifications!</p>
        </div>
      )}
      {selectedOption === 'userProfile' && showUserProfile && (
        <div className="user-profile-section">
          {/* Render content specific to the User Profile section here */}
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
        </div>
      )}

{selectedOption === 'settings' && (
          <div className="settings-section">
            <DeviceForm />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Dashboard;