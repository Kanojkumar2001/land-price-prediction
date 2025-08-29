import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <span className="logo-text">Tierra Analytix</span>
          </Link>
          
          <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cities" 
              className={`nav-link ${isActive('/cities') ? 'nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Cities
            </Link>
            <Link 
              to="/prices" 
              className={`nav-link ${isActive('/prices') ? 'nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Prices
            </Link>
            <Link 
              to="/lands" 
              className={`nav-link ${isActive('/lands') ? 'nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Lands
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div className="nav-toggle" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;