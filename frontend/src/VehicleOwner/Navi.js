import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import SidebarVO from './SidebarVO'; 
function Navi() {
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
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={toggleSidebar} />
        </Link>
      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <IoIcons.IoMdClose onClick={toggleSidebar} />
            </Link>
          </li>

          {SidebarVO.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path} onClick={toggleSidebar}>
                {item.icon}
                <span style={{ color: item.textColor, fontWeight: 'bold' }}>{item.title}</span>
              </Link>
            </li>
          ))}

          <li
            className="nav-text"
            onClick={() => {
              toggleSidebar();
              handleLogout();
            }}
            style={{ cursor: 'pointer' }}
          >
            <IoIcons.IoMdLogOut color="green" size={20} />
            <span className="logout-highlight"><b>Log Out</b></span>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navi;
