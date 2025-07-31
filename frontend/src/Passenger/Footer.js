import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className='footer-container'>
        <h3>About CarRental</h3>
        <p>
          KarGO is your trusted platform for hassle-free car rentals. Whether it's a business trip, weekend getaway, or daily commute, we make mobility easy, affordable, and reliable.
        </p>
      </div>
    <div className='link-container'>
  <h3>Quick Links</h3>
  <nav className='link-columns'>
    <div className='column'>
      <Link to="/home">Home</Link>
      <Link to="/bookcar">Book Cars</Link>
      <Link to="/contact">Contact</Link>
    </div>
    <div className='column'>
      <Link to="/about">About</Link>
      <Link to="/users">Login</Link>
      <Link to="/signup">Register</Link>
    </div>
  </nav>
</div>

      <div className='info-container'>
        <h3>Contact Us</h3>
        <p>Email: KarGOhelp@gmail.com</p>
        <p>Phone: +91 9752685331</p>
        <p>Address: Tulsi Nagar, Indore</p>
      </div>
    </footer>
  );
}

export default Footer;
