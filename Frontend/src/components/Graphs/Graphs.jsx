// Graphs.jsx
import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import './Graphs.css';

const Graphs = () => {
  const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    energyMeter: '',
    xAxis: '',
    yAxis: '',
  });
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    // Fetch your JSON data or replace it with your data loading logic
    fetch('src/dumdataset.json') // replace with the actual path to your JSON file
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
        const uniqueEnergyMeters = [...new Set(data.map((entry) => entry.slaveid))];
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          energyMeter: uniqueEnergyMeters[0], // Set default energyMeter to the first one
          xAxis: Object.keys(data[0])[2], // Set default X-axis to the third key in the data
          yAxis: Object.keys(data[0])[3], // Set default Y-axis to the fourth key in the data
        }));
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  useEffect(() => {
    // Implement filtering logic if needed
    const filtered = jsonData.filter(
      (entry) =>
        (selectedOptions.energyMeter === '' || entry.slaveid === parseInt(selectedOptions.energyMeter))
    );
    setFilteredData(filtered);
  }, [selectedOptions, jsonData]);

  const handleOptionChange = (name, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleApplyButtonClick = () => {
    // Implement any additional logic before rendering the graph
    console.log('Selected Options:', selectedOptions);
    // Additional logic goes here

    // Set showGraph to true when "Apply" button is clicked
    setShowGraph(true);
  };

  return (
    <div className="graphs-container">
      <div className="option-selectors">
        <div className="selector">
          <label htmlFor="energyMeter">Energy Meter:</label>
          <select
            id="energyMeter"
            value={selectedOptions.energyMeter}
            onChange={(e) => handleOptionChange('energyMeter', e.target.value)}
          >
            {jsonData[0] && [...new Set(jsonData.map((entry) => entry.slaveid))].map((id) => (
              <option key={id} value={id}>
                Energy Meter {id}
              </option>
            ))}
          </select>
        </div>

        <div className="selector">
          <label htmlFor="xAxis">X-Axis:</label>
          <select
            id="xAxis"
            value={selectedOptions.xAxis}
            onChange={(e) => handleOptionChange('xAxis', e.target.value)}
          >
            {jsonData[0] && Object.keys(jsonData[0]).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="selector">
          <label htmlFor="yAxis">Y-Axis:</label>
          <select
            id="yAxis"
            value={selectedOptions.yAxis}
            onChange={(e) => handleOptionChange('yAxis', e.target.value)}
          >
            {jsonData[0] && Object.keys(jsonData[0]).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add "Apply" button */}
      <button onClick={handleApplyButtonClick}>Apply</button>

      {/* Pass selected options and data to Graph component */}
      {showGraph && (
        <Graph
          selectedOptions={selectedOptions}
          jsonData={filteredData} // Pass the filtered data if needed
        />
      )}
    </div>
  );
};

export default Graphs;
