import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import SidebarData from '../Components/SidebarData';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebar(!sidebar);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
    window.location.reload(); 
  };
  return (
<>
<div className='navbar'>
<Link to='#' className='menu-bars'>
<FaIcons.FaBars onClick={toggleSidebar} />
</Link>
</div>
<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
<ul className='nav-menu-items'>
<li className='navbar-toggle'>
<Link to='#' className='menu-bars'>
<IoIcons.IoMdClose onClick={toggleSidebar} />
</Link>
</li>
{SidebarData.map((item, index) => (
<li key={index} className={item.cName}>
<Link to={item.path} onClick={toggleSidebar}>
{item.icon}
<span style={{ color: item.textColor }}>{item.title}</span>
</Link>
</li>
))}
<li className='nav-text' onClick={() => { toggleSidebar(); handleLogout(); }} style={{ cursor: 'pointer' }}>
<IoIcons.IoMdLogOut color='green'  />
<span  className="logout-highlight"><b>Log Out</b></span>
</li>
</ul>
</nav>
</>
);
}
export default Navbar;