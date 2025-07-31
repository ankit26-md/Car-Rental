import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Userlogin.css';
import Nav from './Nav';
import Footer from './Footer';

function UserLogin() {
  const [loginInfo, setLoginInfo] = useState({
    emailid: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { emailid, password, role } = loginInfo;

    if (!emailid || !password || !role) {
      alert('All fields must be filled, including role');
      return;
    }

    try {
      const url =
        role === 'vehicleowner'
          ? 'http://localhost:5001/ownerlogin'
          : 'http://localhost:5001/passengerlogin';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailid, password }),
      });

      const result = await response.json();
      const { message, token, owners, passenger } = result;

      if (token) {
        alert(message || 'Successfully logged in');
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        if (role === 'vehicleowner') {
          if (owners) localStorage.setItem('owners', JSON.stringify(owners));
          navigate('/main');
        } else {
          if (passenger) {
            localStorage.setItem('passenger', JSON.stringify(passenger));
          } else {
            console.warn('No passenger object received from backend');
          }
          navigate('/carbooking');
        }
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <>
      <Nav />
      <div className='login-container'>
        <div className='login-box'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="emailid"
                placeholder="Enter your email"
                onChange={handleChange}
                value={loginInfo.emailid}
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={loginInfo.password}
                required
              />
            </div>

            <div>
              <label>Login As</label>
              <select
                name="role"
                value={loginInfo.role}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Role --</option>
                <option value="passenger">Passenger</option>
                <option value="vehicleowner">Vehicle Owner</option>
              </select>
            </div>

            <button type="submit">Login</button>

            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
            <Footer/>

    </>
  );
}

export default UserLogin;
