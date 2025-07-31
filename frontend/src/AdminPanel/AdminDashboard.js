import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import Navbar from '../Components/Navbar';

function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <div className="dashboard-content">
        <h1>{`Welcome to the panel Mr. Ankit Dwivedi`}</h1>

        <div className="box-container">
          <div className="box-1">
            <p><b>Passenger Details</b></p>
            <p>1:Passenger Name</p>
            <p>2:Passenger Address</p>
            <p>3:Passenger Mobile No</p>
            <a href="/passenger">Go to Passenger</a>
          </div>

          <div className="box-2">
    <p><b>Review's</b></p>
    <p>1:Review Rating</p>
    <p>2:Review Message</p>
    <a href="/review">View Review</a>
    </div>
    <div className="box-3">
   <p><b>About Owner</b></p>
    <p>1:Owner Name</p>
    <p>2:Owner Mobile No</p>
    <p>3:Owner Location</p>
    <a href="/owner">View Owner Details</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;