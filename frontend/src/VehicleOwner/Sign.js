import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';

function Sign() {
  const [signInfo, setSignInfo] = useState({
    emailid: '',
    password: '',
    mobileno: '',
    fullname: '',
    address: '',
    dateofbirth: '',
    locationId: '',
    role: '',
  });

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch location list
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('http://localhost:5001/locations');
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error('Failed to load locations:', err);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSign = async (e) => {
    e.preventDefault();
    const { emailid, password, mobileno, fullname, address, dateofbirth, locationId, role } = signInfo;

    if (!emailid || !password || !mobileno || !fullname || !address || !dateofbirth || !locationId || !role) {
      alert('All fields must be filled');
      return;
    }

    console.log('Submitting:', signInfo);
    setLoading(true);

    try {
      // 👇 Select correct endpoint based on role
      const endpoint = role === 'vehicleowner' ? 'vehicles' : 'customers';

      const response = await fetch(`http://localhost:5001/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInfo),
      });

      const result = await response.json();
      if (response.ok && result._id) {
        alert('Signup successful!');
        navigate('/home');
      } else {
        alert(result.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <Nav />
      <h1>Signup</h1>
      <form onSubmit={handleSign}>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='emailid'
            placeholder='Enter your email'
            onChange={handleChange}
            value={signInfo.emailid}
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
            value={signInfo.password}
            required
          />
        </div>

        <div>
          <label>Mobile No</label>
          <input
            type='tel'
            name='mobileno'
            placeholder='Enter your mobile number'
            onChange={handleChange}
            value={signInfo.mobileno}
            required
          />
        </div>

        <div>
          <label>Full Name</label>
          <input
            type='text'
            name='fullname'
            placeholder='Enter your full name'
            onChange={handleChange}
            value={signInfo.fullname}
            required
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type='date'
            name='dateofbirth'
            onChange={handleChange}
            value={signInfo.dateofbirth}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type='text'
            name='address'
            placeholder='Enter your address'
            onChange={handleChange}
            value={signInfo.address}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <select
            name='locationId'
            value={signInfo.locationId}
            onChange={handleChange}
            required
          >
            <option value=''>-- Select Location --</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.locationname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Signup As</label>
          <select
            name='role'
            value={signInfo.role}
            onChange={handleChange}
            required
          >
            <option value=''>-- Select Role --</option>
            <option value='passenger'>Passenger</option>
            <option value='vehicleowner'>Owner</option>
          </select>
        </div>

        <button type='submit' disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        <p>
          Already have an account? <Link to='/users'>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Sign;
