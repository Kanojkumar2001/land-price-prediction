import React from 'react';
import './Cities.css';

const Cities = () => {
  const cities = [
    {
      name: 'Hyderabad',
      state: 'Telangana',
      population: '10 Million+',
      avgPrice: '₹6,500/sq ft',
      growth: '+12%',
      image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Known as Cyberabad, Hyderabad is a major IT hub with excellent infrastructure and growing real estate opportunities. The city offers a perfect blend of traditional culture and modern development.',
      highlights: ['Major IT Hub', 'HITEC City', 'Affordable Living', 'Great Connectivity']
    },
    {
      name: 'Bangalore',
      state: 'Karnataka',
      population: '12 Million+',
      avgPrice: '₹8,200/sq ft',
      growth: '+15%',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Silicon Valley of India, Bangalore is the technology capital with numerous MNCs and startups. Pleasant weather and cosmopolitan culture make it highly desirable for property investment.',
      highlights: ['Tech Capital', 'Pleasant Weather', 'Startup Ecosystem', 'Global Companies']
    },
    {
      name: 'Chennai',
      state: 'Tamil Nadu',
      population: '7 Million+',
      avgPrice: '₹7,000/sq ft',
      growth: '+10%',
      image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Detroit of India, Chennai is a major automotive and industrial hub. The city offers excellent healthcare facilities and educational institutions with strong cultural heritage.',
      highlights: ['Automotive Hub', 'Healthcare Excellence', 'Cultural Heritage', 'Port City']
    },
    {
      name: 'Ahmedabad',
      state: 'Gujarat',
      population: '8 Million+',
      avgPrice: '₹4,500/sq ft',
      growth: '+8%',
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Commercial capital of Gujarat, Ahmedabad is known for its textile industry and growing pharmaceutical sector. The city offers affordable real estate with good returns on investment.',
      highlights: ['Textile Industry', 'Affordable Housing', 'Business Friendly', 'Heritage City']
    },
    {
      name: 'Mumbai',
      state: 'Maharashtra',
      population: '20 Million+',
      avgPrice: '₹15,000/sq ft',
      growth: '+18%',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Financial capital of India, Mumbai is the dream city with the highest real estate prices. Home to Bollywood and major financial institutions, it offers premium investment opportunities.',
      highlights: ['Financial Capital', 'Bollywood', 'Premium Properties', 'Maximum City']
    },
    {
      name: 'Vadodara',
      state: 'Gujarat',
      population: '2 Million+',
      avgPrice: '₹3,800/sq ft',
      growth: '+6%',
      image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Cultural capital of Gujarat, Vadodara is an emerging IT and pharmaceutical hub. The city offers excellent educational institutions and affordable real estate options.',
      highlights: ['Cultural Capital', 'Educational Hub', 'Emerging IT Sector', 'Quality Life']
    }
  ];

  return (
    <div className="cities">
      <div className="container">
        <div className="cities-header">
          <h1 className="section-title">Top Cities for Property Investment</h1>
          <p className="section-subtitle">
            Explore India's most promising real estate markets with comprehensive insights, 
            growth potential, and investment opportunities across major metropolitan cities.
          </p>
        </div>

        <div className="cities-grid">
          {cities.map((city, index) => (
            <div key={index} className="city-card">
              <div className="city-image">
                <img src={city.image} alt={`${city.name} cityscape`} />
                <div className="city-badge">
                  <span className="growth-rate">{city.growth} Growth</span>
                </div>
              </div>
              
              <div className="city-content">
                <div className="city-header">
                  <h3 className="city-name">{city.name}</h3>
                  <span className="city-state">{city.state}</span>
                </div>
                
                <div className="city-stats">
                  <div className="stat-item">
                    <span className="stat-label">Population</span>
                    <span className="stat-value">{city.population}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Avg Price</span>
                    <span className="stat-value">{city.avgPrice}</span>
                  </div>
                </div>
                
                <p className="city-description">{city.description}</p>
                
                <div className="city-highlights">
                  {city.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight-tag">{highlight}</span>
                  ))}
                </div>
                
                <div className="city-actions">
                  <button className="btn btn-primary">View Details</button>
                  <button className="btn btn-secondary">Price Trends</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cities-comparison">
          <h2 className="comparison-title">City Comparison Overview</h2>
          <div className="comparison-table">
            <div className="table-header">
              <div className="header-cell">City</div>
              <div className="header-cell">Avg Price/sq ft</div>
              <div className="header-cell">Growth Rate</div>
              <div className="header-cell">Population</div>
              <div className="header-cell">Investment Rating</div>
            </div>
            {cities.map((city, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">
                  <strong>{city.name}</strong>
                  <span className="city-state-small">{city.state}</span>
                </div>
                <div className="table-cell price-cell">{city.avgPrice}</div>
                <div className="table-cell growth-cell">{city.growth}</div>
                <div className="table-cell">{city.population}</div>
                <div className="table-cell rating-cell">
                  <div className="rating">
                    {'★'.repeat(Math.floor(Math.random() * 2) + 4)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;