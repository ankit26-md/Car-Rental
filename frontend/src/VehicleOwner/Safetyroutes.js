import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Safetyroutes() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return token && role === 'vehicleowner' ? <Outlet /> : <Navigate to="/home" />;
}

export default Safetyroutes;
