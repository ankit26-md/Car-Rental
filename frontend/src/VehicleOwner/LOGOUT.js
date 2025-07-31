import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarVO from './SidebarVO';

function LOGOUT() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/home');
    window.location.reload(); // optional to reset app stat

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

      {/* Manual logout button */}
      <div className="nav-text" onClick={handleLogout} style={{ cursor: 'pointer', marginTop: 'auto' }}>
        <IoIcons.IoMdLogOut />
        <span>Log Out</span>
      </div>
    </div>
  );
}

export default LOGOUT;
