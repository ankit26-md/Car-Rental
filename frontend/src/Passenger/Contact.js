import React from 'react';
import './ContactUs.css'; 
import Nav from './Nav';
import Footer from './Footer';

function Contact() {
  return (
    <>
          <Nav/>

    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We’d love to hear from you! Whether you have a question about our cars, pricing, booking process, or anything else – our team is ready to help.
      </p>

      <div className="contact-details">
        <h3>📍 Office Location</h3>
        <p>
          KarGO Car Rentals<br />
          Ground Floor,Tulsiyana Apartment<br />
          Nipania Road, Indore, Madhya Pradesh - 452001
        </p>

        <h3>📞 Phone</h3>
        <p>
          Customer Support: <a href="tel:+91 97526 85331">+91 97526 85331</a><br />
          Office Hours: 9:00 AM – 8:00 PM (Mon–Sat)
        </p>

        <h3>📧 Email</h3>
        <p>
          General Inquiries & Bookings: : <a href="mailto:ad26the@gmail.com">ad26the@gmail.com</a><br />
          
        </p>

        <h3>💬 WhatsApp</h3>
        <p>
          Chat with us on WhatsApp: <a href="https://wa.me/919752685331" target="_blank" rel="noreferrer">Click to Message</a>
        </p>

        <h3>🧑‍💼 Meet the Founder</h3>
        <p>
          Ankit Dwivedi – Founder & CEO<br />
          Passionate about travel, cars, and customer-first experiences. Rahul personally oversees service quality and customer satisfaction to ensure you get the best!
        </p>
      </div>

      <div className="contact-form-note">
        <p><strong>Looking to book a car or need help?</strong><br />
        Feel free to reach out directly or use the booking feature on our website. We respond to all queries within 24 hours.</p>
      </div>
    </div>
          <Footer/>

    </>
  );
}

export default Contact;
