import React, { useState, useEffect } from 'react';
import predictionService from '../services/predictionService';
import './PredictionForm.css';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    squareFeet: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [locations, setLocations] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    // Test API connection and load locations
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const status = await predictionService.testConnection();
      if (status) {
        setApiStatus('connected');
        loadLocations();
      } else {
        setApiStatus('disconnected');
      }
    } catch (error) {
      setApiStatus('error');
      console.error('API connection failed:', error);
    }
  };

  const loadLocations = async () => {
    try {
      const locationList = await predictionService.getLocations();
      setLocations(locationList);
    } catch (error) {
      console.error('Failed to load locations:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const { location, squareFeet, bedrooms, bathrooms } = formData;
      
      if (!location || !squareFeet || !bedrooms || !bathrooms) {
        throw new Error('Please fill in all fields');
      }

      const predictedPrice = await predictionService.predictPrice(
        location,
        parseFloat(squareFeet),
        parseFloat(bedrooms),
        parseFloat(bathrooms)
      );

      setPrediction(predictedPrice);
    } catch (error) {
      setError(error.message || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  if (apiStatus === 'checking') {
    return <div className="prediction-form">Checking API connection...</div>;
  }

  if (apiStatus === 'disconnected') {
    return (
      <div className="prediction-form">
        <div className="error-message">
          <h3>Backend API Not Available</h3>
          <p>The prediction service is currently unavailable. Please try again later.</p>
          <button onClick={checkApiStatus} className="btn btn-primary">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="prediction-form">
      <h3>Property Price Prediction</h3>
      <p>Get accurate price predictions using our AI-powered model</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="squareFeet">Square Feet:</label>
          <input
            type="number"
            id="squareFeet"
            name="squareFeet"
            value={formData.squareFeet}
            onChange={handleInputChange}
            placeholder="e.g., 1500"
            min="100"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bedrooms">Bedrooms:</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
            placeholder="e.g., 3"
            min="1"
            max="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bathrooms">Bathrooms:</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
            placeholder="e.g., 2"
            min="1"
            max="10"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {prediction && (
        <div className="prediction-result">
          <h4>Predicted Price:</h4>
          <div className="price-display">
            ₹{prediction.toFixed(2)} Lakhs
          </div>
          <p className="price-note">
            *This is an AI-generated prediction based on current market data
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
