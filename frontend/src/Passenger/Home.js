import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    travelDate: '',
    pickup: '',
    drop: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBookCar = () => {
    const { travelDate, pickup, drop } = form;
    if (!travelDate || !pickup || !drop) {
      alert('Please fill in all fields before booking.');
      return;
    }

    navigate('/bookcar', { state: form });
  };

  return (
<>
<Nav />
<div className='image-home'>
<div className="home">
<div className="home-form">
<input type="date" name="travelDate" placeholder="Enter Travel Date" value={form.travelDate} onChange={handleChange}/>
<input type="text"  name="pickup" placeholder="Enter Pick Up" value={form.pickup} onChange={handleChange}/>
<input type="text" name="drop" placeholder="Enter Drop" value={form.drop} onChange={handleChange}/>
<button className="book-btn" onClick={handleBookCar}>Book Car</button>
</div>
<section className="section">
<h2>Why Choose Us</h2>
<div className="why-choose-container">
<div className="why-box">
<h3>Trusted & Verified</h3>
<p>All vehicles and owners are verified and inspected regularly.</p>
</div>
<div className="why-box">
<h3>24/7 Support</h3>
<p>We offer round-the-clock support for all your travel needs.</p>
</div>
<div className="why-box">
<h3>Easy Booking</h3>
<p>Book your ride in just a few clicks with seamless experience.</p>
</div>
</div>
</section>
<section className="section">
<h2>Our Services</h2>
<ul className="services-list">
<li>✔ Airport Pickups & Drops</li>
<li>✔ Outstation Car Rentals</li>
<li>✔ Daily Commute Rentals</li>
<li>✔ Chauffeur Driven Cars</li>
</ul>
</section>
<section className="section">
<h2>What Our Customers Say</h2>
<div className="testimonials">
<div className="testimonial-box">
<p>"Smooth experience and great service"</p>
<h4>- Rahul Tripathi</h4>
</div>
<div className="testimonial-box">
<p>"Clean cars and punctual service and didn't charge extra amount</p>
<h4>- Anushka Sharma</h4>
</div>
<div className="testimonial-box">
<p>"Affordable rates and helpful support team"</p>
<h4>- Satyam Parasar</h4>
</div>
</div>
</section>
<section className="section cta-section">
<h2>Ready to Hit the Road?</h2>
<p>Sign up or login now and rent your perfect ride today.</p>
<button className="get-started-btn" onClick={() => navigate('/users')}>Get Started</button>
</section>
</div>
</div>
<Footer />
</>
);
}
export default Home;