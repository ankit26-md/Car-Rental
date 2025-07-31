import React from 'react'
import Navi from './Navi'
import './Main.css'
function Main() {
  return (
    <>
<Navi />
<div className="main-content">
<h1>{`Welcome to the Vehicle Owner Panel`}</h1>
<div className="box-container">
          <div className="box1">
            <p><b>Post Car</b></p>
            <p>1: Upload Car Info</p>
            <p>2: Set Rates</p>
            <p>3: Assign Availability</p>
            <a href="/postcar">Go to Post Car</a>
          </div>

          <div className="box2">
            <p><b>Booking</b></p>
            <p>1: Booking History</p>
            <p>2: Current Bookings</p>
            <a href="/booking">View Bookings</a>
          </div>

          <div className="box3">
            <p><b>Reviews</b></p>
            <p>1: Review Messages</p>
            <p>2: Review Ratings</p>
            <a href="/vreview">Check Reviews</a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main