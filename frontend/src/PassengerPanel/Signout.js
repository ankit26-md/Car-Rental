import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidemenu from './Sidemenu';
import { IoMdLogOut } from 'react-icons/io';

function Signout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    navigate('/home', { replace: true });
  };

  return (
    <div className="sidebar">
      {Sidemenu.map((item, index) => (
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
        <IoMdLogOut />
        <span>Log Out</span>
      </div>
    </div>
  );
}

export default Signout;
