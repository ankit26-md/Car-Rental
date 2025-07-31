import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import Sidemenu from './Sidemenu'; // ✅ Use correct name

function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={toggleSidebar} />
        </Link>
        <h1 className="logo-text">MyCarApp</h1>
      </div>

      {/* Sidebar */}
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <IoIcons.IoMdClose onClick={toggleSidebar} />
            </Link>
          </li>

          {Sidemenu.map((item, index) => (
            <li key={index} className={item.cName} onClick={toggleSidebar}>
              <Link to={item.path}>
                {item.icon}
                <span style={{ color: item.textColor || '#fff', fontWeight: 'bold' }}>{item.title}</span>
              </Link>
            </li>
          ))}

          <li className="nav-text logout" onClick={() => { toggleSidebar(); handleLogout(); }}>
            <IoIcons.IoMdLogOut size={20} color="red" />
            <span><b>Log Out</b></span>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
