import React, { useState, useContext } from 'react'
import './register.css'
import axios from 'axios'
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom'; //for routing

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
        city: "hong kong",
        from: "hong kong",
        relationship: 0,
        profilePicture: "person/default.jpg",
        coverPicture: 'post/3.jpg'
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      setCurrentUser(response.data);
      navigate('/login'); // React Router hook
    } catch (error) {
      if (error.response) {
        const message = error.response.status === 409
          ? "User already exists"
          : "An error occurred";
        alert('Registration failed! ' + message);
      } else {
        alert('Registration failed! An unexpected error occurred.');
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
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='loginInput'
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='loginInput'
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='loginInput'
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className='loginInput'
              />
              <button type="submit" className='loginButton'>Register</button>
            </form>
            <button className='loginRegisterButton' onClick={() => navigate('/login')}>
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
