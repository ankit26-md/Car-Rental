import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import './BookCars.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function BookCar() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableCars();
  }, []);

  const fetchAvailableCars = async () => {
    try {
      const res = await axios.get('http://localhost:5001/posts'); 
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching car posts:', error);
    }
  };

 const handleBook = (car) => {
  alert('Please login or register first');
  navigate('/users');
};


  return (
    <div>
      <Nav />
      <div className='booking-image'>
      <h2 className="section-title">Available Cars</h2>
      <div className="card-container">
        {posts.map((item) => (
          <div key={item._id} className="car-card">
            <img
              src={`http://localhost:5001/images/${item.carimage1}`}
              alt={item.cartitle}
              className="car-image"
            />
            <h3 className="car-name">{item.cartitle}</h3>
            <p className="car-price">Price: ₹{item.price}/day</p>
            <button
              className="book-button"
              onClick={() => handleBook(item)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
          <Footer />

    </div>

  );
}

export default BookCar;
