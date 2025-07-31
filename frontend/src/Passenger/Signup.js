import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import'./Signup.css'
import Nav from './Nav';
import Footer from './Footer';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
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

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('http://localhost:5001/locations');
        const data = await res.json();
        console.log('Location API response:', data);

        // Assuming API returns { locations: [...] } or just [...]
        if (Array.isArray(data)) {
          setLocations(data); // response is a raw array
        } else if (Array.isArray(data.locations)) {
          setLocations(data.locations); // response has locations array inside
        } else {
          console.warn('Unexpected locations format:', data);
          setLocations([]);
        }
      } catch (err) {
        console.error('Failed to load locations:', err);
        setLocations([]);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { emailid, password, mobileno, fullname, address, dateofbirth, locationId, role } = signupInfo;

    if (!emailid || !password || !mobileno || !fullname || !address || !dateofbirth || !locationId || !role) {
      alert('All fields must be filled');
      return;
    }

    setLoading(true);

    try {
      const endpoint = role === 'vehicleowner' ? 'vehicles' : 'customers';

      const response = await fetch(`http://localhost:5001/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      if (response.ok && result._id) {
        alert('Signup successful!');
        navigate('/home');
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
          <Nav />
          <div className='image'>
      <h1>Signup</h1>
    <div className='signup-container'>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='emailid'
            placeholder='Enter your email'
            onChange={handleChange}
            value={signupInfo.emailid}
            required
            autoFocus
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            onChange={handleChange}
            value={signupInfo.password}
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
            value={signupInfo.mobileno}
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
            value={signupInfo.fullname}
            required
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type='date'
            name='dateofbirth'
            onChange={handleChange}
            value={signupInfo.dateofbirth}
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
            value={signupInfo.address}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <select
            name='locationId'
            value={signupInfo.locationId}
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
            value={signupInfo.role}
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
    </div>
          <Footer/>
    
    </>
  );
}

export default Signup;
