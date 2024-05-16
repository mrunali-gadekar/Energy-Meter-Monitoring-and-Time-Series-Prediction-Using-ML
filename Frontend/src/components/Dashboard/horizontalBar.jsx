// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import './horizontalgraph.css';

// const HorizontalBarGraph = () => {
//   const [graphData, setGraphData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:57541/api/v1/get-apparent-energy-data');

//         if (response.status !== 200) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Invalid content type. Expected JSON.');
//         }

//         const data = response.data;

//         const metersData = data.latestApparentEnergyPerSlave.map((meter) => meter.latestApparentEnergy);
//         const totalApparentEnergy = data.totalApparentEnergy;

//         const meterLabels = data.latestApparentEnergyPerSlave.map((meter, index) => `Meter ${meter._id}`);
//         const allLabels = [...meterLabels, 'Total'];

//         setGraphData({
//           labels: allLabels,
//           datasets: [
//             {
//               label: 'Apparent Energy',
//               data: [...metersData, null],
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//             {
//               label: 'Total Apparent Energy',
//               data: [null, null, totalApparentEnergy],
//               backgroundColor: 'rgba(255, 99, 132, 0.2)',
//               borderColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         setError(`Error fetching data: ${error.message}`);
//       }
//     };

//     fetchData();
//   }, []);

//   const chartOptions = {
//     indexAxis: 'y',
//     scales: {
//       x: {
//         beginAtZero: true,
//         position: 'bottom',
//       },
//       y: {
//         display: true,
//         position: 'left',
//         title: {
//           display: false,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//     },
//     elements: {
//       line: {
//         fill: false,
//         borderWidth: 2,
//       },
//     },
//   };

//   return (
//     <div className="graph-container">
//       {error && <p>{error}</p>}
//       {graphData && <Bar data={graphData} options={chartOptions} />}
//     </div>
//   );
// };

// export default HorizontalBarGraph;



import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import jsonData from '../../horizontalbargraph.json'; // Import your JSON file
import './horizontalgraph.css';

const HorizontalBarGraph = () => {
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = jsonData;

      const metersData = data.latestApparentEnergyPerSlave.map((meter) => meter.latestApparentEnergy);
      const totalApparentEnergy = data.totalApparentEnergy;

      const meterLabels = data.latestApparentEnergyPerSlave.map((meter) => `Meter ${meter._id}`);
      const allLabels = [...meterLabels, 'Total'];

      setGraphData({
        labels: allLabels,
        datasets: [
          {
            label: 'Apparent Energy',
            data: [...metersData, null],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Total Apparent Energy',
            data: [null, null, totalApparentEnergy],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      setError(`Error processing data: ${error.message}`);
    }
  }, []);

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        position: 'bottom',
      },
      y: {
        display: true,
        position: 'left',
        title: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    elements: {
      line: {
        fill: false,
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="graph-container">
      {error && <p>{error}</p>}
      <h2>Apparent Energy Consumption</h2>
      {graphData && <Bar data={graphData} options={chartOptions} />}
    </div>
  );
};

export default HorizontalBarGraph;
