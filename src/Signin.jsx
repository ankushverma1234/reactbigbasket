import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './store';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.user);

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    const value = formData.username.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!value) errors.username = 'Email or Phone is required';
    else if (!emailPattern.test(value) && !phonePattern.test(value))
      errors.username = 'Enter valid email or 10-digit phone number';

    if (!formData.password) errors.password = 'Password is required';

    return errors;
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginUser(formData));
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('user', JSON.stringify({ username: formData.username, isLoggedIn: true }));
      navigate('/veg'); // Redirect to veg products after login
    }
  }, [isAuthenticated, navigate, formData.username]);

  return (
    <div className="signin-container" style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            name="username"
            placeholder="Email or Phone"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.username && <small style={{ color: 'red' }}>{errors.username}</small>}
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, fontWeight: 'bold' }}
        >
          Sign In
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Signin;
