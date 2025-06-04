import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './store';
import './register.css';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(registerUser(data));

    localStorage.setItem('user', JSON.stringify({ name: data.username, isLoggedIn: true }));
    localStorage.setItem('shopName', 'BigBasket SuperMart');

    alert('Registration Successful! You can now log in.');
    reset();
    navigate('/signin');
  };

  const password = watch('password', '');

  return (
    <div className="register-container" style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Full Name"
            {...register('fullName', { required: 'Full Name is required' })}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.fullName && <small style={{ color: 'red' }}>{errors.fullName.message}</small>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' },
            })}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.email && <small style={{ color: 'red' }}>{errors.email.message}</small>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: 10 }}>Gender:</label>
          <label style={{ marginRight: 10 }}>
            <input type="radio" value="Male" {...register('gender', { required: 'Please select your gender' })} /> Male
          </label>
          <label style={{ marginRight: 10 }}>
            <input type="radio" value="Female" {...register('gender', { required: 'Please select your gender' })} /> Female
          </label>
          <label>
            <input type="radio" value="Other" {...register('gender', { required: 'Please select your gender' })} /> Other
          </label>
          <br />
          {errors.gender && <small style={{ color: 'red' }}>{errors.gender.message}</small>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.username && <small style={{ color: 'red' }}>{errors.username.message}</small>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone', {
              required: 'Phone Number is required',
              pattern: { value: /^\d{10}$/, message: 'Phone Number must be 10 digits' },
            })}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.phone && <small style={{ color: 'red' }}>{errors.phone.message}</small>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.password && <small style={{ color: 'red' }}>{errors.password.message}</small>}
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: value => value === password || 'Passwords do not match',
            })}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.confirmPassword && <small style={{ color: 'red' }}>{errors.confirmPassword.message}</small>}
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, fontWeight: 'bold' }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
