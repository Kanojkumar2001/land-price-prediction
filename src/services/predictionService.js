import { getApiUrl, API_ENDPOINTS } from '../config/api';

class PredictionService {
  // Get available locations
  async getLocations() {
    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.locations));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.locations || [];
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  }

  // Predict house price
  async predictPrice(location, squareFeet, bedrooms, bathrooms) {
    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.predict), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: location,
          square_feet: squareFeet,
          bedrooms: bedrooms,
          bathrooms: bathrooms
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.predicted_price_lakhs || 0;
    } catch (error) {
      console.error('Error predicting price:', error);
      throw error;
    }
  }

  // Test API connection
  async testConnection() {
    try {
      const response = await fetch(getApiUrl('/api/test'));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error testing API connection:', error);
      return null;
    }
  }
}

export default new PredictionService();
