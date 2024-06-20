import React, { useState } from 'react';
import logo from '../assets/image 466.png';
import axios from 'axios';
import showToasts from './Toast';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isRecruiter, setRecruiter] = useState(false);

  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const resetData = () => {
    setEmail('');
    setName('');
    setMobile('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://job-listing-server-7fp1.onrender.com/register', {
        name,
        email,
        password,
        isRecruiter,
      });
      console.log(response.data);
      if (response.data.status === 'Success') {
        localStorage.setItem('userEmail', email)
        setErrors('');
        
        showToasts(response.data.message, 'success')
        navigate('/job/feed');
    
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
      showToasts(error.response.data.message, 'error')
    }
    resetData();
  };

  return (
    <div className='signup-section'>
      <div style={{ margin: '0 3rem' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <h3 style={{ fontSize: '1.5em', marginBottom: '0rem' }}>
              Create an account
            </h3>
            <p
              style={{ fontSize: '0.8em', color: '#525252', marginBottom: '1rem' }}
            >
              Your personal job finder is here
            </p>
            {errors && <span style={{ color: 'red' }}>{errors}</span>}
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <input
              type='text'
              placeholder='  Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ height: '2rem', width: '20rem' }}
            />
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <input
              type='text'
              placeholder='  Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: '2rem', width: '20rem' }}
            />
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <input
              type='text'
              placeholder='  Mobile'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ height: '2rem', width: '20rem' }}
            />
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <input
              type='password'
              placeholder='  Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: '2rem', width: '20rem' }}
            />
          </div>
          
          <div className="card-selection">
            <h3>Select Account Type</h3>
            <div className="cards-container">
              <div className={`card ${isRecruiter ? 'selected' : ''}`} onClick={() => setRecruiter(true)}>
                <h4>Recruiter</h4>
                <p>Post, edit, update, and delete jobs.</p>
              </div>
              <div className={`card ${!isRecruiter ? 'selected' : ''}`} onClick={() => setRecruiter(false)}>
                <h4>Candidate</h4>
                <p>Search and apply for jobs.</p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginBottom: '0.8rem',
              fontSize: '0.8em',
              color: '#525252',
            }}
          >
            <input
              type='checkbox'
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
            />
            <label>
              By creating an account, I agree to our terms of use and privacy
              policy
            </label>
            <div>
              {!check && (
                <span style={{ color: 'red' }}>
                  Please accept our Terms & Conditions
                </span>
              )}
            </div>
          </div>
          <button
            type='submit'
            style={{
              color: '#fff',
              backgroundColor: '#ED5353',
              height: '3rem',
              width: '8rem',
              border: 'transparent',
            }}
          >
            Create Account
          </button>
          <div>
            <p>
              Already have an account?{' '}
              <span
                style={{ cursor: 'pointer', fontWeight: 'bold', color: 'black' }}
              >
                <NavLink to='/login'>Sign in</NavLink>
              </span>
            </p>
          </div>
        </form>
      </div>

      <div className='image-section'>
        <h4 style={{ color: '#fff', position: 'absolute', right: '8rem' }}>
          Your Personal Job Finder
        </h4>
        <img src={logo} alt='' style={{ width: '40vw', height: 'auto' }} />
      </div>
    </div>
  );
}

export default Signup;
