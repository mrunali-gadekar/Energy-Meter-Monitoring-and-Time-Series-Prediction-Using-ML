// groupconsumption.jsx

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './groupconsumption.css'
const GroupConsumption = () => {
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('src/groupconsumption.json');
        const data = await response.json();
        setGroupData(data);
      } catch (error) {
        console.error('Error fetching group consumption data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: groupData.map((group) => group._id || 'Unknown Group'),
    datasets: [
      {
        data: groupData.map((group) => group.totalApparentEnergy),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#32CD32'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#32CD32'],
      },
    ],
  };

  return (
    <div className="group-consumption-container">
      <h2>Group Consumption</h2>
      <div className="chart-container">
        <Pie data={chartData} />
      </div>
      <div className="group-details">
        <ul>
          {groupData.map((group, index) => (
            <li key={group._id || 'Unknown Group'}>
              <span className="group-name">{group._id || 'Unknown Group'}:</span>
              <span className="total-apparent-energy">{group.totalApparentEnergy}</span>
              <div className="color-indicator" style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupConsumption;
