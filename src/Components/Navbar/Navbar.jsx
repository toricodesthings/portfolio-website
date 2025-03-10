import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import avatar from "../../assets/logo.png";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [navVisible, setNavVisible] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // When switching to desktop, always show the nav
      mobile ? setNavVisible(false) : setNavVisible(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNav = () => {
    if (isMobile) {
      setNavVisible(!navVisible);
    }
  };

  return (
    <div className="navbar">
      {isMobile ? (
        // On mobile, clicking the avatar toggles the navbar visibility
        <div className="avatar-hovanimate" onClick={toggleNav}>
          <div className="avatar-wrapper">
            <img src={avatar} alt="Avatar" className="avatar" />
          </div>
        </div>
      ) : (
        // On desktop, avatar links to home
        <div className="avatar-hovanimate">
          <div className="avatar-wrapper">
            <Link to="/">
              <img src={avatar} alt="Avatar" className="avatar" />
            </Link>
          </div>
        </div>
      )}

      <ul className={`nav-menu ${isMobile && navVisible ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/music">Music</Link></li>
        <li><Link to="/projects">Coding Projects</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/misc">Misc</Link></li>
      </ul>
      
      <div className={`nav-connect-wrapper ${isMobile && navVisible ? "active" : ""}`}>
        <Link to="/contact" className="nav-connect-link">
          <div className="nav-connect">Connect with Me!</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
