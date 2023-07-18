import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRememberChange = (event) => {
    setRemember(event.target.checked);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      remember: remember
    };

    try {
      const response = await axios.post('http://localhost:8000/api/login', data, {
        withCredentials: true
      });

      console.log(response.data);
      navigate('/post/manage')
      // Redirect to the home page
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(Object.values(error.response.data.errors));
      } else {
        console.log(error);
      }
    }
  }

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="col-md-10 mx-auto col-lg-7">
        <form className="p-4 p-md-5 border bg-light" onSubmit={handleSubmit}>
          <header className="text-center">
            <h2 className="text-2xl font-bold uppercase mb-1">Login</h2>
            <p className="mb-4">Log into your account create to post</p>
          </header>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control @error('email') is-invalid @enderror" id="email" name="email" value={email} onChange={handleEmailChange} required autoFocus />
            {errors.length > 0 && errors.map((error, index) => (
              <div key={index} className="invalid-feedback">{error}</div>
            ))}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control @error('password') is-invalid @enderror" id="password" name="password" value={password} onChange={handlePasswordChange} required />
            {errors.length > 0 && errors.map((error, index) => (
              <div key={index} className="invalid-feedback">{error}</div>
            ))}
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="remember" id="remember" checked={remember} onChange={handleRememberChange} />
              <label className="form-check-label" htmlFor="remember">
                Remember Me
              </label>
            </div>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">LogIn</button>
          </div>
          <div className="mb-3">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;