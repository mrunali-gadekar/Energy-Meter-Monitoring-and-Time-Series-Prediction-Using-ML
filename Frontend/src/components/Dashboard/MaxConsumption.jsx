import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './maxconsumption.css'; // Import the CSS file
import jsonData from '../../maxconsumption.json'; // Import the JSON file

const MaxConsumption = () => {
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Use the data from the imported JSON file
      const data = jsonData;

      const chartData = {
        labels: data.map((entry) => entry._id),
        datasets: [
          {
            label: 'Max Apparent Power',
            backgroundColor: '#dc3545',
            borderColor: '#470000',
            borderWidth: 1,
            hoverBackgroundColor: '#470000',
            hoverBorderColor: '#470000',
            data: data.map((entry) => entry.maxApparentPower),
          },
        ],
      };

      setGraphData(chartData);
    } catch (error) {
      console.error('Error processing data:', error);
      setError('Error processing data. Please check your JSON format.');
    }
  }, []);

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
        position: 'bottom',
      },
      y: {
        display: true,
        position: 'left',
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="max-consumption-container">
      <h2>Max Apparent Power in the Last 7 Days</h2>
      {/* {error && <p>{error}</p>} */}
      {graphData && <Bar data={graphData} options={chartOptions} />}
    </div>
  );
};

export default MaxConsumption;
