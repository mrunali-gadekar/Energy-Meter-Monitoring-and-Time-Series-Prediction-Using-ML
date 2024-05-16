import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './TotalMeter.css';

const TotalMeter = () => {
  const [meterData, setMeterData] = useState({
    totalSlaves: 0,
    activeSlaves: 0,
    inactiveSlaves: 0,
  });

  useEffect(() => {
    // Define your JSON data directly
    const jsonData = {
      "totalSlaves": 3,
      "activeSlaves": 1,
      "inactiveSlaves": 2
    };

    // Update state with the JSON data
    setMeterData(jsonData);
  }, []);

  const chartData = {
    labels: ['Online Meters', 'Offline Meters'],
    datasets: [
      {
        data: [meterData.activeSlaves, meterData.inactiveSlaves],
        backgroundColor: ['#28a745', '#dc3545'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '95%', // Adjust the cutout percentage to control the hole size
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  const percentage = ((meterData.activeSlaves / (meterData.activeSlaves + meterData.inactiveSlaves)) * 100).toFixed(2);

  return (
    <div className="total-meter-container">
      <div className="chart-container">
        <h2>Total Meters: {meterData.totalSlaves}</h2>
        <Doughnut data={chartData} options={chartOptions} />
        <div className="percentage">
          <span className="percentage-text">{percentage}%</span>
        </div>
      </div>
      <div className="meter-list">
        <ul>
          <li>
            <span className="circle circle-online"></span> Online {' '}<br />
            <span className="meter-count">{meterData.activeSlaves}</span>
          </li>
          <li>
            <span className="circle circle-offline"></span> Offline {' '}<br />
            <span className="meter-count">{meterData.inactiveSlaves}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TotalMeter;
