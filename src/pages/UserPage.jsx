/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import showToasts from '../components/Toast';
import Loader from '../components/Loader';

function UserPage({ userData, isUserLogged }) {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const usertoken = localStorage.getItem('userToken');
      const response = await axios.patch(
        `https://job-listing-server-7fp1.onrender.com/update/${userData._id}`,
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${usertoken}`
          }
        }
      );
      if (response.data.status === 'Success') {
        showToasts('Profile updated successfully', 'success');
        isUserLogged();
      } else {
        showToasts(response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToasts(error.response.data.message, 'error');
    }
    setLoading(false);
  };

  return (
    <div className='profile-page'>
      {loading && <Loader />}
      <h2>Update Profile</h2>
      <form className='profile-form' onSubmit={handleUpdateProfile}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </div>
        <button type='submit' className='update-button'>Update Profile</button>
      </form>
    </div>
  );
}

export default UserPage;
