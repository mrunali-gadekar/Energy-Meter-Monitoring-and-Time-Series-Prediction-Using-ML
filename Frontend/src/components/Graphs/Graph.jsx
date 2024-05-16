// Graph.jsx
import React, { useEffect, useRef } from 'react';
import { Chart, LinearScale, BarController, BarElement } from 'chart.js';

const Graph = ({ selectedOptions, jsonData }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    // Register the scales before creating the chart
    Chart.register(LinearScale, BarController, BarElement);

    const ctx = chartContainer.current.getContext('2d');

    // Your chart configuration goes here
    const chartConfig = {
      type: 'bar',
      data: {
        labels: jsonData.map((entry) => entry[selectedOptions.xAxis]),
        datasets: [
          {
            label: selectedOptions.yAxis,
            data: jsonData.map((entry) => entry[selectedOptions.yAxis]),
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear', // Use 'linear' or another valid scale type
            position: 'bottom',
          },
          y: {
            type: 'linear', // Use 'linear' or another valid scale type
            position: 'left',
          },
        },
      },
    };

    const myChart = new Chart(ctx, chartConfig);

    // Clean up the chart when the component is unmounted
    return () => {
      myChart.destroy();
      Chart.unregister(LinearScale, BarController, BarElement);
    };
  }, [selectedOptions, jsonData]);

  return <canvas ref={chartContainer} />;
};

export default Graph;
