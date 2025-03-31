import React, { useState } from 'react'
import './login.css'
import axios from 'axios'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password, });
      alert('Login successful!');
    } catch (error) {
      if (error.response) {
        const message = error.response.status === 404
          ? "User not found"
          : error.response.status === 400
            ? "Wrong password"
            : "An error occurred";
        alert('Login failed! ' + message);
      } else {
        alert('Login failed! An unexpected error occurred.');
      }
    }
  };

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Cherrysocial</h3>
          <span className="loginDesc">Connect with friends and the world around you on Cherrysocial</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="loginInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="loginButton" type="submit">Log In</button>
            </form>
            <span className="loginForgot">Forget Password?</span>
            <button className='loginRegisterButton'>
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;