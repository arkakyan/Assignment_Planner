import React from 'react';
import '../App.css';

// This js includes a link to the API documentation, which opens in a new tab.
const NavBar = () => {
  return (
    <nav>
      <a
        href={`${process.env.PUBLIC_URL}/api-documentation.html`}
        target="_blank"
        rel="noopener noreferrer"
        className="api-link" 
      >
        API Documentation
      </a>
    </nav>
  );
};

export default NavBar;
