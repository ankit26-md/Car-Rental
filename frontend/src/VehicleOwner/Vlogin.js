import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navi from './Navi';

function Vlogin() {
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
        localStorage.setItem('userToken', token);
        localStorage.setItem('role', role);

        if (role === 'vehicleowner') {
          // Save owner info in localStorage
          // Check if owners is an array, then save first element
          if (Array.isArray(owners)) {
            localStorage.setItem('owner', JSON.stringify(owners[0] || {}));
          } else {
            localStorage.setItem('owner', JSON.stringify(owners || {}));
          }
          navigate('/main'); // for vehicle owner
        } else {
          // Save passenger info in localStorage
          localStorage.setItem('passenger', JSON.stringify(passenger || {}));
          navigate('/profile'); // for passenger
        }
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className='container'>
      <Navi />
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='emailid'
            placeholder='Enter your email'
            onChange={handleChange}
            value={loginInfo.emailid}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            onChange={handleChange}
            value={loginInfo.password}
            required
          />
        </div>

        <div>
          <label>Login As</label>
          <select
            name='role'
            value={loginInfo.role}
            onChange={handleChange}
            required
          >
            <option value=''>-- Select Role --</option>
            <option value='passenger'>Passenger</option>
            <option value='vehicleowner'>Vehicle Owner</option>
          </select>
        </div>

        <button type='submit'>Login</button>

        <p>
          Don&apos;t have an account? <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Vlogin;
