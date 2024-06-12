import React, { useState } from 'react';
import AddJobLogo from '../assets/WallpaperDog-20567151 1.png';
import './AddJobPage.css';
import axios from 'axios';
import showToasts from '../components/Toast';
import { useNavigate } from 'react-router';

function AddJobPage() {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    companyName: '',
    logoUrl: '',
    jobPosition: '',
    monthlySalary: 0,
    jobType: '',
    remote: false,
    location: '',
    jobDescription: '',
    aboutCompany: '',
    skillsRequired: [],
    additionalInformation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRemote = (e) => {
    if(e.target.value === 'Remote') {
      setJob({...job, remote: true})
    }
  }

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',');
    setJob(prevState => ({
      ...prevState,
      skillsRequired: skills
    }));
  };

  const addJob = async (e) => {
    e.preventDefault();
    try {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const response = await axios.post('http://localhost:5000/add', job, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        if(response.data.status === 'Success') {
          setTimeout(() => {
            navigate('/')
          }, 2000)
          showToasts(response.data.message, 'success')
        } else {
          showToasts(response.data.message, 'error')
        }
      }
    } catch (error) {
      console.log(error.response);
      showToasts(error.response.data.message, 'error')
    }
  };

  return (
    <div className="add-job-container">
      <div className="add-job-form-section">
        <form onSubmit={addJob}>
          <div>
            <h2>Add job description</h2>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Company Name</label>
            <div>
              <input type="text" placeholder="Enter your company name here" name="companyName" onChange={handleChange} />
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Add logo URL</label>
            <div>
              <input type="text" placeholder="Enter the link" name="logoUrl" onChange={handleChange} />
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Job position</label>
            <div>
              <input type="text" placeholder="Enter job position" name="jobPosition" onChange={handleChange} />
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Monthly salary</label>
            <div>
              <input type="number" placeholder="Enter Amount in rupees" name="monthlySalary" onChange={handleChange} />
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Job Type</label>
            <div>
              <select name="jobType" onChange={handleChange}>
                <option>Select</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Remote/office</label>
            <div>
              <select name="remote" onChange={handleRemote}>
                <option>Select</option>
                <option>Remote</option>
                <option>Office</option>
              </select>
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Location</label>
            <div>
              <input type="text" placeholder="Enter Location" name="location" onChange={handleChange} />
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Job Description</label>
            <div>
              <textarea placeholder="Type the job description" name="jobDescription" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">About Company</label>
            <div>
              <textarea placeholder="Type about your company" name="aboutCompany" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Skills Required</label>
            <div>
              <input type="text" placeholder="Enter the must have skills (comma separated)" name="skillsRequired" onChange={handleSkillsChange} />
            </div>
          </div>
          <div className="add-job-card">
            <label className="add-job-item">Additional Information</label>
            <div>
              <textarea placeholder="Enter the additional information" name="additionalInformation" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="add-job-actions">
            <button type="button" className="cancel-button">Cancel</button>
            <button type="submit" className="add-job-button">+ Add Job</button>
          </div>
        </form>
      </div>
      <div className="add-job-image-section">
        <img src={AddJobLogo} alt="Add Job" />
        <p>Recruiter add job details here</p>
      </div>
    </div>
  );
}

export default AddJobPage;
