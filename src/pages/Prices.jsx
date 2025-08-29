import React, { useState } from 'react';
import './Prices.css';

const Prices = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const properties = [
    {
      id: 1,
      city: 'Mumbai',
      type: 'Apartment',
      name: 'Luxury 3BHK in Bandra',
      price: '₹3.5 Cr',
      pricePerSqft: '₹15,000',
      area: '1,250 sq ft',
      location: 'Bandra West',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Sea View', 'Premium Location', 'Modern Amenities', 'Metro Connectivity']
    },
    {
      id: 2,
      city: 'Bangalore',
      type: 'Villa',
      name: 'Independent Villa in Whitefield',
      price: '₹2.8 Cr',
      pricePerSqft: '₹8,200',
      area: '2,800 sq ft',
      location: 'Whitefield',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Garden', 'Gated Community', 'IT Hub Proximity', 'Club House']
    },
    {
      id: 3,
      city: 'Hyderabad',
      type: 'Apartment',
      name: 'Modern 2BHK in HITEC City',
      price: '₹85 Lakh',
      pricePerSqft: '₹6,500',
      area: '1,100 sq ft',
      location: 'HITEC City',
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['IT Corridor', 'Metro Station', 'Shopping Malls', 'Hospitals Nearby']
    },
    {
      id: 4,
      city: 'Chennai',
      type: 'Apartment',
      name: 'Spacious 3BHK in OMR',
      price: '₹1.2 Cr',
      pricePerSqft: '₹7,000',
      area: '1,600 sq ft',
      location: 'Old Mahabalipuram Road',
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['IT Companies', 'Beach Access', 'Educational Institutes', 'Airport Connectivity']
    },
    {
      id: 5,
      city: 'Ahmedabad',
      type: 'Villa',
      name: 'Premium Villa in Vastrapur',
      price: '₹1.8 Cr',
      pricePerSqft: '₹4,500',
      area: '3,200 sq ft',
      location: 'Vastrapur',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Prime Location', 'Business District', 'Educational Hub', 'Cultural Centers']
    },
    {
      id: 6,
      city: 'Vadodara',
      type: 'Apartment',
      name: 'Affordable 2BHK in Alkapuri',
      price: '₹45 Lakh',
      pricePerSqft: '₹3,800',
      area: '950 sq ft',
      location: 'Alkapuri',
      image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Central Location', 'Parks Nearby', 'Good Schools', 'Shopping Centers']
    }
  ];

  const cities = ['All', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Vadodara'];
  const types = ['All', 'Apartment', 'Villa', 'Penthouse'];

  const filteredProperties = properties.filter(property => {
    const cityMatch = selectedCity === 'All' || property.city === selectedCity;
    const typeMatch = selectedType === 'All' || property.type === selectedType;
    return cityMatch && typeMatch;
  });

  const priceRanges = [
    { range: '₹20L - ₹50L', count: '1,250+', description: 'Entry-level properties' },
    { range: '₹50L - ₹1Cr', count: '980+', description: 'Mid-range properties' },
    { range: '₹1Cr - ₹2Cr', count: '650+', description: 'Premium properties' },
    { range: '₹2Cr+', count: '320+', description: 'Luxury properties' }
  ];

  return (
    <div className="prices">
      <div className="container">
        <div className="prices-header">
          <h1 className="section-title">Property Prices & Market Trends</h1>
          <p className="section-subtitle">
            Explore comprehensive property pricing data across India's top cities. 
            Get real-time market insights and make informed investment decisions.
          </p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>City</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Property Type</label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Ranges */}
        <div className="price-ranges">
          <h2 className="ranges-title">Property Price Ranges</h2>
          <div className="ranges-grid">
            {priceRanges.map((range, index) => (
              <div key={index} className="range-card">
                <div className="range-price">{range.range}</div>
                <div className="range-count">{range.count} Properties</div>
                <div className="range-description">{range.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Properties Listing */}
        <div className="properties-section">
          <h2 className="properties-title">
            Featured Properties ({filteredProperties.length})
          </h2>
          <div className="properties-grid">
            {filteredProperties.map(property => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  <img src={property.image} alt={property.name} />
                  <div className="property-badge">{property.type}</div>
                </div>
                <div className="property-content">
                  <div className="property-location">
                    <span className="city">{property.city}</span>
                    <span className="area">{property.location}</span>
                  </div>
                  <h3 className="property-name">{property.name}</h3>
                  <div className="property-pricing">
                    <div className="main-price">{property.price}</div>
                    <div className="price-details">
                      <span>{property.pricePerSqft}/sq ft</span>
                      <span>{property.area}</span>
                    </div>
                  </div>
                  <div className="property-features">
                    {property.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <div className="property-actions">
                    <button className="btn btn-primary">View Details</button>
                    <button className="btn btn-secondary">Contact Agent</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div className="market-insights">
          <h2 className="insights-title">Market Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">📈</div>
              <h3>Market Trend</h3>
              <p>Property prices have increased by an average of 12% across major cities in the last year.</p>
            </div>
            <div className="insight-card">
              <div className="insight-icon">🏆</div>
              <h3>Best ROI</h3>
              <p>Bangalore and Hyderabad show the highest return on investment with 15%+ annual growth.</p>
            </div>
            <div className="insight-card">
              <div className="insight-icon">💡</div>
              <h3>Investment Tip</h3>
              <p>Properties near IT corridors and metro stations offer better appreciation potential.</p>
            </div>
            <div className="insight-card">
              <div className="insight-icon">🎯</div>
              <h3>Price Prediction</h3>
              <p>AI models predict 8-10% price appreciation in tier-1 cities for the next fiscal year.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;