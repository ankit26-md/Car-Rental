import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function SafeRoute() {
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
return token && role === 'passenger' ? <Outlet /> : <Navigate to="/home" />;

}

export default SafeRoute;
