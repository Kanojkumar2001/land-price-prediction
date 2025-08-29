import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">PropertyPredict</h3>
            <p className="footer-description">
              AI-powered property price prediction platform helping investors make informed real estate decisions across India's top cities.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/cities">Cities</a></li>
              <li><a href="/prices">Prices</a></li>
              <li><a href="/lands">Lands</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="section-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#">Price Prediction</a></li>
              <li><a href="#">Market Analysis</a></li>
              <li><a href="#">Investment Advisory</a></li>
              <li><a href="#">Property Valuation</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="section-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 PropertyPredict. All rights reserved.</p>
          <p>Made with ❤️ for smart real estate investments</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;