import React, { useState } from 'react';
import './Lands.css';

const Lands = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const landCategories = [
    { name: 'Agricultural', count: 245, icon: '🌾' },
    { name: 'Residential', count: 180, icon: '🏘️' },
    { name: 'Commercial', count: 95, icon: '🏢' },
    { name: 'Industrial', count: 67, icon: '🏭' },
  ];

  const lands = [
    {
      id: 1,
      title: 'Prime Agricultural Land in Punjab',
      category: 'Agricultural',
      location: 'Ludhiana, Punjab',
      area: '5.2 Acres',
      price: '₹85 Lakh',
      pricePerAcre: '₹16.3 Lakh/acre',
      image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Fertile Soil', 'Irrigation Facility', 'Road Access', 'Power Connection'],
      description: 'Highly fertile agricultural land with excellent water supply and modern irrigation systems. Perfect for crop cultivation with high yield potential.'
    },
    {
      id: 2,
      title: 'Residential Plot in Gurgaon',
      category: 'Residential',
      location: 'Sector 83, Gurgaon',
      area: '1,500 sq ft',
      price: '₹1.2 Cr',
      pricePerAcre: '₹8,000/sq ft',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Gated Society', 'Metro Connectivity', 'Schools Nearby', 'Parks & Gardens'],
      description: 'Premium residential plot in a well-developed sector with excellent infrastructure and connectivity to major business hubs.'
    },
    {
      id: 3,
      title: 'Commercial Land in Pune IT Park',
      category: 'Commercial',
      location: 'Hinjewadi, Pune',
      area: '2.5 Acres',
      price: '₹15 Cr',
      pricePerAcre: '₹6 Cr/acre',
      image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['IT Hub Location', 'High ROI Potential', 'Development Ready', 'Government Approvals'],
      description: 'Strategic commercial land in the heart of Pune IT corridor with approved development plans and high appreciation potential.'
    },
    {
      id: 4,
      title: 'Industrial Plot in Chennai',
      category: 'Industrial',
      location: 'Oragadam, Chennai',
      area: '3.8 Acres',
      price: '₹4.5 Cr',
      pricePerAcre: '₹1.18 Cr/acre',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Industrial Zone', 'Port Connectivity', 'Power Infrastructure', 'Transportation Hub'],
      description: 'Well-located industrial land with excellent connectivity to Chennai port and major transportation networks. Ideal for manufacturing setup.'
    },
    {
      id: 5,
      title: 'Farmhouse Land in Nashik',
      category: 'Agricultural',
      location: 'Nashik Wine Country',
      area: '8.5 Acres',
      price: '₹2.1 Cr',
      pricePerAcre: '₹24.7 Lakh/acre',
      image: 'https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Vineyard Suitable', 'Scenic Location', 'Water Source', 'Wine Tourism Area'],
      description: 'Beautiful farmland in Nashik wine region, perfect for vineyard development or luxury farmhouse with tourism potential.'
    },
    {
      id: 6,
      title: 'Residential Development Land',
      category: 'Residential',
      location: 'Bangalore Outer Ring Road',
      area: '12.2 Acres',
      price: '₹18 Cr',
      pricePerAcre: '₹1.47 Cr/acre',
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Development Approved', 'IT Corridor', 'Metro Extension', 'Investment Grade'],
      description: 'Large residential development land with approved plans for township development. Strategic location with high growth potential.'
    }
  ];

  const filteredLands = selectedCategory === 'All' 
    ? lands 
    : lands.filter(land => land.category === selectedCategory);

  return (
    <div className="lands">
      <div className="container">
        <div className="lands-header">
          <h1 className="section-title">Land & Plot Investments</h1>
          <p className="section-subtitle">
            Discover premium land opportunities across India. From agricultural farmlands to 
            commercial plots, find the perfect investment opportunity that matches your vision.
          </p>
        </div>

        {/* Categories Overview */}
        <div className="categories-section">
          <h2 className="categories-title">Land Categories</h2>
          <div className="categories-grid">
            {landCategories.map((category, index) => (
              <div 
                key={index} 
                className={`category-card ${selectedCategory === category.name ? 'category-active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} Available</p>
              </div>
            ))}
            <div 
              className={`category-card ${selectedCategory === 'All' ? 'category-active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              <div className="category-icon">🌍</div>
              <h3 className="category-name">All Categories</h3>
              <p className="category-count">{landCategories.reduce((sum, cat) => sum + cat.count, 0)} Total</p>
            </div>
          </div>
        </div>

        {/* Featured Lands */}
        <div className="lands-listing">
          <h2 className="listing-title">
            Featured Land Opportunities ({filteredLands.length})
          </h2>
          <div className="lands-grid">
            {filteredLands.map(land => (
              <div key={land.id} className="land-card">
                <div className="land-image">
                  <img src={land.image} alt={land.title} />
                  <div className="land-category-badge">{land.category}</div>
                </div>
                
                <div className="land-content">
                  <div className="land-header">
                    <h3 className="land-title">{land.title}</h3>
                    <p className="land-location">📍 {land.location}</p>
                  </div>

                  <div className="land-details">
                    <div className="detail-item">
                      <span className="detail-label">Area:</span>
                      <span className="detail-value">{land.area}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Price:</span>
                      <span className="detail-value price-highlight">{land.price}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Rate:</span>
                      <span className="detail-value">{land.pricePerAcre}</span>
                    </div>
                  </div>

                  <p className="land-description">{land.description}</p>

                  <div className="land-features">
                    {land.features.map((feature, idx) => (
                      <span key={idx} className="feature-badge">{feature}</span>
                    ))}
                  </div>

                  <div className="land-actions">
                    <button className="btn btn-primary">View Details</button>
                    <button className="btn btn-secondary">Schedule Visit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Guide */}
        <div className="investment-guide">
          <h2 className="guide-title">Land Investment Guide</h2>
          <div className="guide-grid">
            <div className="guide-card">
              <div className="guide-icon">🎯</div>
              <h3>Location Analysis</h3>
              <p>Research upcoming infrastructure projects, connectivity plans, and development potential of the area before investing.</p>
            </div>
            <div className="guide-card">
              <div className="guide-icon">📋</div>
              <h3>Legal Verification</h3>
              <p>Ensure clear titles, verify ownership documents, check for any legal disputes, and confirm development permissions.</p>
            </div>
            <div className="guide-card">
              <div className="guide-icon">💰</div>
              <h3>ROI Calculation</h3>
              <p>Analyze market trends, appreciation potential, rental yields, and compare with similar properties in the vicinity.</p>
            </div>
            <div className="guide-card">
              <div className="guide-icon">🔍</div>
              <h3>Due Diligence</h3>
              <p>Physical inspection, soil testing for agricultural land, utility connections, and accessibility to main roads.</p>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="market-trends">
          <h2 className="trends-title">Land Market Trends 2024</h2>
          <div className="trends-content">
            <div className="trend-item">
              <div className="trend-stat">+23%</div>
              <div className="trend-label">Agricultural Land Appreciation</div>
            </div>
            <div className="trend-item">
              <div className="trend-stat">+18%</div>
              <div className="trend-label">Residential Plot Growth</div>
            </div>
            <div className="trend-item">
              <div className="trend-stat">+15%</div>
              <div className="trend-label">Commercial Land Demand</div>
            </div>
            <div className="trend-item">
              <div className="trend-stat">+12%</div>
              <div className="trend-label">Industrial Zone Expansion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lands;