import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = loginInfo;
    if (!username || !password ) {
      alert('All fields must be filled');
      return;
    }

    try {
      const url = "http://localhost:5001/adminlogin";
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),  
      });
      const result = await response.json();
      const { message, token, user } = result;
      if (token) {
        alert(message || 'Successfully logged in');
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        alert(message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Please try again.');
    }
  };
  return (
<div className='container'>
<h1>Login</h1>
<form onSubmit={handleLogin}>
<div>
<label htmlFor='username'>User Name</label>
<input type='text' name='username' autoFocus placeholder='Enter your User Name'  onChange={handleChange} value={loginInfo.username}/>
</div>
<div>
<label htmlFor='password'>Password</label>
<input type='password' name='password' placeholder='Enter your Password' autoComplete='current-password' onChange={handleChange} value={loginInfo.password}/>
</div>
<button type='submit'>Login</button>
</form>
</div>
  );
}
export default AdminLogin;
    




















































