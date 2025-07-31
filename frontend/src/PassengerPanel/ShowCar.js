import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './ShowCar.css'; // import the CSS file

const API_BASE = 'http://localhost:5001';
const CAT_API = `${API_BASE}/cats`;

const ShowCar = () => {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carRes = await axios.get(`${API_BASE}/posts`);
        setCars(carRes.data);
      } catch (err) {
        console.error('Error fetching cars:', err);
        alert('Failed to fetch cars');
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(CAT_API);
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      }
    };

    fetchCars();
    fetchCategories();
  }, []);

  const getCategoryName = (catid) => {
    const cat = categories.find(c => c._id === (catid?._id || catid));
    return cat ? cat.catname : 'N/A';
  };
  return (
    <>
      <NavBar />
      <div className="showcar-container">
        <h2>Available Cars</h2>
        <div className="car-list">
          {cars.map(car => (
            <div key={car._id} className="car-card">
              <div className="car-images">
                <img
                  src={`${API_BASE}/Images/${car.carimage1}`}
                  alt="car1"
                />
                {car.carimage2 && (
                  <img
                    src={`${API_BASE}/Images/${car.carimage2}`}
                    alt="car2"
                  />
                )}
              </div>

              <h4>{car.cartitle}</h4>
              <p><b>Variant:</b> {car.variant}</p>
              <p><b>Vehicle No:</b> {car.carvehicleno}</p>
              <p><b>Driver:</b> {car.driverstatus}</p>
              <p><b>Price:</b> ₹{car.price}</p>
              <p><b>Category:</b> {getCategoryName(car.catid)}</p>
              <p><b>Owner Name:</b> {car.ownername || 'N/A'}</p>
              <p><b>Mobile:</b> {car.ownermobile || 'N/A'}</p>

              <button
                className="book-button"
                onClick={() =>
                  navigate('/bookings', {
                    state: {
                      car: {
                        ...car,
                        catid: car.catid?._id || car.catid,
                        catname: getCategoryName(car.catid),
                      }
                    }
                  })
                }
              >
                Book This Car
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowCar;
