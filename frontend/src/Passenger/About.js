import React from 'react';
import './AboutUs.css';
import Nav from './Nav';
import Footer from './Footer';

function About() {
  return (
    <>
      <Nav />
      <div className='images'>
        <div className="about-container">
          <h1>About Us</h1>
          <p>
            <strong>Welcome to KarGO Car Rentals</strong> – your trusted partner for smooth, affordable, and reliable car rental services.
          </p>

          <p>
            <strong>KarGO</strong> was founded in <strong>2025</strong> by <strong>Ankit Dwivedi</strong>, a passionate entrepreneur and automobile enthusiast with a vision to make car rentals simple, accessible, and budget-friendly for everyone. What started as a local rental initiative has now evolved into a full-fledged platform serving individuals, families, and businesses across multiple cities.
          </p>

          <p>
            At <strong>KarGO</strong>, we believe that traveling should be convenient, flexible, and stress-free. Our platform allows users to:
          </p>
          <ul>
            <li>Browse and book a wide range of rental cars, from hatchbacks and sedans to SUVs and luxury vehicles.</li>
            <li>View detailed pricing, car features, and availability in real time.</li>
            <li>Choose rental durations based on your needs – hourly, daily, or weekly.</li>
            <li>Get doorstep car delivery (in supported areas).</li>
            <li>Access 24/7 customer support and breakdown assistance.</li>
          </ul>

          <p>
            Our fleet is regularly maintained, sanitized, and quality-checked to ensure that you always get a safe and reliable vehicle. Whether you’re planning a weekend getaway, a business trip, or just need a temporary ride – we’ve got you covered.
          </p>

          <p>
            <strong>Our Mission:</strong> To provide seamless and affordable car rental experiences tailored to the modern traveler’s lifestyle.
          </p>

          <p>
            <strong>Our Vision:</strong> To become one of India's most trusted and customer-first car rental platforms, combining technology with convenience.
          </p>

          <p>
            Thank you for choosing <strong>KarGO</strong>. We look forward to being a part of your journey!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
