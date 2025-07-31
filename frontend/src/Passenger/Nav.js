import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <>
      <div className="navbar">
        <div className="logo">KarGO</div>
        <ul className="nav-links">
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/bookcar'>Book Cars</Link></li>
          <li><Link to='/about'>About us</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
          <li>
            <Link to='/users'>Login </Link>
          </li>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
