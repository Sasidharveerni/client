/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../App.css';
import bgImg1 from '../assets/Rectangle 2.png';
import bgImg2 from '../assets/Rectangle 13.png';
import JobSection from '../components/JobSection';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';
import showToasts from '../components/Toast';

function MainPage({ islogin, userData, isUserLogged }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    validateUser();
    isUserLogged();
  }, []);

  useEffect(() => {
    const skillsSet = new Set();
    jobs.forEach(job => {
      job.skillsRequired.forEach(skill => skillsSet.add(skill));
    });
    setAvailableSkills(Array.from(skillsSet));
  }, [jobs]);

  const validateUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://job-listing-server-7fp1.onrender.com/jobs');
      setJobs(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setLoading(true);
    try {
      localStorage.removeItem('userToken');
      setTimeout(() => {
        navigate('/login');
      }, 2000)
      showToasts('Logged out successfully', 'success')
    } catch (error) {
      console.error('Error during logout:', error);
    }
    setLoading(false);
  };

  const handleSkillSelect = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleApplyFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const queryParams = [];
      if (selectedSkills.length > 0) {
        queryParams.push(`skills=${selectedSkills.join(',')}`);
      }
      if (searchText) {
        queryParams.push(`jobPosition=${searchText}`);
      }
      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      const response = await axios.get(`https://job-listing-server-7fp1.onrender.com/job/filter${queryString}`);
      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  const handleClear = () => {
    setSelectedSkills([]);
    setSearchText('');
    validateUser();
  };

  const handleAddJob = () => {
    navigate('/add/job');
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleViewApplications = () => {
    navigate('/user/applications');
  };

  return (
    <>
      <div className='container'>
        <div className='header'>
          {loading && <Loader />}

          <div>
            <p>Job Finder</p>
            <img style={{ position: 'relative', bottom: '1.5rem', left: '0rem' }} src={bgImg1} alt='' />
          </div>

          <div style={{ position: 'relative', bottom: '0rem' }}>
            <img src={bgImg2} alt='' />
          </div>

          {islogin ? (
            <div className='header-sec'>
              <div style={{ margin: '1rem' }}>
                <button style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
              </div>
              <div style={{ margin: '1rem', position: 'relative' }}>
                <button onClick={handleDropdownToggle} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff' }}>
                  Hello! {userData.isRecruiter ? 'Recruiter' : userData.name }
                </button>
                {dropdownOpen && (
                  <div className='dropdown-menu'>
                    <button onClick={() => navigate('/user/profile')}>Update Profile</button>
                    <button onClick={handleViewApplications}>View Your Applications</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='header-sec'>
              <div style={{ margin: '1rem' }}>
                <button style={{ border: '1px solid #fff', background: 'transparent', color: 'white', fontSize: '1em', cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >Login</button>
              </div>
              <div style={{ margin: '1rem' }}>
                <button style={{ backgroundColor: '#fff', color: '#ED5353', border: '2px', fontSize: '1em', cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                >Register</button>
              </div>
            </div>
          )}
        </div>

        <div className='search-section'>
          <form onSubmit={handleApplyFilter}>
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <i className="fas fa-search"></i>
              <input
                type='text'
                placeholder='Type any job title'
                className='search-bar'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className='filter-section'>
                <select className="dropdown" onChange={handleSkillSelect} defaultValue="">
                  <option value="" disabled>Skills</option>
                  {availableSkills.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                </select>

                {selectedSkills.map((skill, index) => (
                  <div key={index} className="tag">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)}>X</button>
                  </div>
                ))}

                <div className="button-container">
                  <button className='filter-btn' type='submit'>Apply Filter</button>
                  <button className="clear-button" type="button" onClick={handleClear}>Clear</button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {jobs && jobs.map((job, ind) => (
          <JobSection key={ind} jobs={job} islogin={islogin} userData={userData} />
          
        ))}

        {islogin && userData.isRecruiter && (
          <div style={{ position: 'fixed', right: '2rem', bottom: '2rem', zIndex: '1000' }}>
            <button 
              style={{
                padding: '0.5rem',
                fontSize: '0.8em',
                backgroundColor: '#ED5353',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px'
              }}
              onClick={handleAddJob}
            >
              Add Job
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MainPage;
