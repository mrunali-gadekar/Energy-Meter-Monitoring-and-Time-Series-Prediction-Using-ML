import React, { useState, useEffect } from 'react';
import './pf.css';

const PF = () => {
  const [pfData, setPFData] = useState({ PFLeading: 0, PFLagging: 0 });

  useEffect(() => {
    // Define your JSON data directly
    const jsonData = { "PFLeading": 1, "PFLagging": 2 };

    // Update state with the JSON data
    setPFData(jsonData);
  }, []);

  return (
    <div className="pf-container">
      <h2>PF status with frequency</h2>
      <div className="pf-values-container">
        <div className="pf-value">PF Leading: {pfData.PFLeading}</div>
        <div className="pf-value">PF Lagging: {pfData.PFLagging}</div>
      </div>
    </div>
  );
};

export default PF;
