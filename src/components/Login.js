import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import alertContext from '../contexts/alertContext';
import Alerts from './Alerts';

const Login = () => {
  const [credentials, setCredentials] = useState(null);
  let navigate = useNavigate();
  const contextAlert = useContext(alertContext);
  const { alert, showAlert } = contextAlert;
  const host = "https://inotebook-m8lw.onrender.com"

  const onValueChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    document.getElementById('spinner').hidden = false;
    e.preventDefault();
    const url = host + "/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "email": credentials.email, "password": credentials.password }), // body data type must match "Content-Type" header

    });

    const res = await response.json();
    if (res.success) {
      localStorage.setItem('authToken', res.authToken);
      showAlert("Welcome Back! You have successfully logged in.", "success");
      navigate('/');
      document.getElementById('spinner').hidden = true;
    } else {
      showAlert("Please enter valid credentials", "warning");
      document.getElementById('spinner').hidden = true;
    }
    
  }

  return (
    <>
      <Alerts alert={alert} />
      <div className='container'>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt='Login' />
          </div>
          <form className=' col-md-6 col-lg-6 col-xl-5 my-5 mx-auto border border-dark rounded' onSubmit={handleLogin}>
            <h4 className='my-2'>Login to iNotebook </h4>
            <div className="mb-3 my-2">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onValueChange} required />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' id="password" onChange={onValueChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Login  <div class="spinner-border spinner-border-sm" id='spinner' hidden='true' role="status">
          <span class="visually-hidden">Loading...</span>
          </div></button>
            <div className="mb-3 my-5">
              <div id="emailHelp" className="form-text">New User? Register here! won't take more than a mintue &#128150;</div>
              <Link
                className="btn btn-outline-success mx-1"
                type="submit"
                to="/signup"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
