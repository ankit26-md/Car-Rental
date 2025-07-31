import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './BookingPassenger.css'; // ✅ Correct CSS import

const API_BASE = 'http://localhost:5001';

const BookingPassenger = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [form, setForm] = useState({
    sourcelocation: '',
    destinationlocation: '',
    bookingdate: '',
    pickuptime: '',
    droptime: '',
    paymentMethod: 'Cash',
  });

  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedPassenger = localStorage.getItem('passenger');
    if (storedPassenger) {
      try {
        const parsed = JSON.parse(storedPassenger);
        setCustomer(parsed);
      } catch (err) {
        console.error('Failed to parse passenger data from localStorage');
      }
    }
  }, []);

  if (!car) {
    return (
      <div className="booking-container">
        <p>No car selected for booking.</p>
        <button onClick={() => navigate('/carbooking')}>Back to Cars List</button>
      </div>
    );
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    const {
      sourcelocation,
      destinationlocation,
      bookingdate,
      pickuptime,
      droptime,
      paymentMethod,
    } = form;

    if (!sourcelocation || !destinationlocation || !bookingdate || !pickuptime || !droptime || !paymentMethod) {
      setMessage('Please fill in all fields');
      return;
    }

    if (!customer || !customer._id) {
      setMessage('Customer not logged in');
      return;
    }

    const payload = {
      passengerid: customer._id,
      carid: car._id,
      catid: car.catid?._id || car.catid,
      sourcelocation,
      destinationlocation,
      bookingdate,
      pickuptime: new Date(`${bookingdate}T${pickuptime}`),
      droptime: new Date(`${bookingdate}T${droptime}`),
      paymentMethod,
    };

    try {
      await axios.post(`${API_BASE}/cars`, payload);
      setMessage('Booking confirmed!');
    } catch (err) {
      setMessage('Booking failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <NavBar />
      <div className="booking-container">
        <h2>Booking Form for: {car.cartitle}</h2>

        <img src={`${API_BASE}/Images/${car.carimage1}`} alt="car1" className="car-image" />
        {car.carimage2 && (
          <img src={`${API_BASE}/Images/${car.carimage2}`} alt="car2" className="car-image" />
        )}

        <p><b>Variant:</b> {car.variant}</p>
        <p><b>Vehicle No:</b> {car.carvehicleno}</p>
        <p><b>Driver:</b> {car.driverstatus}</p>
        <p><b>Price:</b> ₹{car.price}</p>

        <label>Category:</label>
        <input type="text" value={car.catname || 'N/A'} readOnly className="readonly-input" />

        <label>Owner Name:</label>
        <input type="text" value={car.ownername || 'N/A'} readOnly className="readonly-input" />

        <label>Owner Mobile No:</label>
        <input type="text" value={car.ownermobile || 'N/A'} readOnly className="readonly-input" />

        <label>Source Location:</label>
        <input type="text" name="sourcelocation" value={form.sourcelocation} onChange={handleFormChange} />

        <label>Destination Location:</label>
        <input type="text" name="destinationlocation" value={form.destinationlocation} onChange={handleFormChange} />

        <label>Booking Date:</label>
        <input type="date" name="bookingdate" value={form.bookingdate} onChange={handleFormChange} />

        <label>Pickup Time:</label>
        <input type="time" name="pickuptime" value={form.pickuptime} onChange={handleFormChange} />

        <label>Drop Time:</label>
        <input type="time" name="droptime" value={form.droptime} onChange={handleFormChange} />

        <label>Payment Method:</label>
        <select name="paymentMethod" value={form.paymentMethod} onChange={handleFormChange}>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>

        <button onClick={handleBooking}>Confirm Booking</button>

        {message && (
          <p className={`booking-message ${message.includes('confirmed') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default BookingPassenger;
