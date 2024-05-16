// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Prediction() {
//     const [features, setFeatures] = useState({ /* Initial feature values */ });
//     const [prediction, setPrediction] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleChange = (event) => {
//         setFeatures({ ...features, [event.target.name]: event.target.value });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await axios.post('/predict', features);
//             setPrediction(response.data.prediction);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         // Fetch initial data or set default features here (optional)
//     }, []);

//     return (
//         <div>
//             <h2>Apparent Power Prediction</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* Input fields for features */}
//                 <button type="submit" disabled={isLoading}>
//                     {isLoading ? 'Loading...' : 'Predict'}
//                 </button>
//             </form>
//             {error && <p className="error">{error}</p>}
//             {prediction && <p>Predicted Apparent Power: {prediction}</p>}
//         </div>
//     );
// }

// export default Prediction;



import React, { useState } from 'react';
import axios from 'axios';

function Prediction() {
    const [formData, setFormData] = useState({
        Global_reactive_power: '',
        Voltage: '',
        Global_intensity: '',
        Sub_metering_1: '',
        Sub_metering_2: '',
        Sub_metering_3: ''
    });
    const [prediction, setPrediction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('/predict', formData);
            setPrediction(response.data.prediction);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Power Consumption Prediction</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Global_reactive_power">Global Reactive Power:</label>
                <input type="number" id="Global_reactive_power" name="Global_reactive_power" value={formData.Global_reactive_power} onChange={handleChange} />
                {/* Add similar inputs for other features */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Predict'}
                </button>
            </form>
            {error && <p>Error: {error}</p>}
            {prediction && <p>Predicted Global Active Power: {prediction}</p>}
        </div>
    );
}

export default Prediction;