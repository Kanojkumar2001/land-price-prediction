import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Predict Property Prices with
                <span className="highlight"> AI Precision</span>
              </h1>
              <p className="hero-description">
                Get accurate property price predictions across India's top cities using advanced machine learning algorithms. Make informed real estate decisions with data-driven insights.
              </p>
              <div className="hero-buttons">
                <a href="#features" className="btn btn-primary">Explore Features</a>
                <a href="http://127.0.0.1:5000/predict" className="btn btn-secondary">Try Prediction</a>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern city skyline"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Choose PropertyPredict?</h2>
          <p className="section-subtitle">
            Our platform combines cutting-edge technology with comprehensive market data to provide you with the most accurate property price predictions.
          </p>
          
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">
                <img 
                  src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="AI Technology"
                />
              </div>
              <h3 className="feature-title">AI-Powered Predictions</h3>
              <p className="feature-description">
                Advanced machine learning algorithms analyze thousands of data points to provide accurate price predictions with 95% accuracy rate.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img 
                  src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Market Analysis"
                />
              </div>
              <h3 className="feature-title">Real-Time Market Data</h3>
              <p className="feature-description">
                Stay updated with live market trends, price fluctuations, and investment opportunities across major Indian cities.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img 
                  src="https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Expert Insights"
                />
              </div>
              <h3 className="feature-title">Expert Insights</h3>
              <p className="feature-description">
                Get detailed market analysis and investment recommendations from real estate experts and industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prediction Section */}
      <section id="prediction" className="prediction">
        <div className="container">
          <div className="prediction-content">
            <div className="prediction-text">
              <h2 className="prediction-title">Smart Property Valuation</h2>
              <p className="prediction-description">
                Our AI-driven platform analyzes multiple factors including location, amenities, market trends, and historical data to provide precise property valuations. Whether you're buying, selling, or investing, get the insights you need to make confident decisions.
              </p>
              <div className="prediction-stats">
                <div className="stat">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Accuracy Rate</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Properties Analyzed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">6</span>
                  <span className="stat-label">Major Cities</span>
                </div>
              </div>
            </div>
            <div className="prediction-image">
              <img 
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Property analysis dashboard"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Predict Your Property Value?</h2>
            <p className="cta-description">
              Join thousands of investors and homeowners who trust our AI-powered predictions for their real estate decisions.
            </p>
            <div className="cta-buttons">
              <a href="/cities" className="btn btn-primary">Explore Cities</a>
              <a href="http://127.0.0.1:5000/predict" className="btn btn-secondary">Try Prediction</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;