import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarData from './SidebarData';
import * as IoIcons from 'react-icons/io';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <div className="sidebar">
      {SidebarData.map((item, index) => (
        <div
          key={index}
          className={item.cName}
          onClick={() => navigate(item.path)}
          style={{ cursor: 'pointer' }}
        >
          {item.icon}
          <span>{item.title}</span>
        </div>
      ))}

      <div className="nav-text" onClick={handleLogout} style={{ cursor: 'pointer', marginTop: 'auto' }}>
        <IoIcons.IoMdLogOut />
        <span>Log Out</span>
      </div>
    </div>
  );
}

export default Logout;
