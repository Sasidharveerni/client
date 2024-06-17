import React from 'react';
import Persons from '../assets/Group 1.png';
import IndiaFlag from '../assets/india.png';
import { useNavigate } from 'react-router';

const JobSection = ({ jobs, islogin, userData }) => {
    const navigate = useNavigate();

    if (!jobs || !jobs.skillsRequired) {
        return <div>No job details available</div>;
    }

    return (
        <div className='job-section'>
            <div className="vertical"></div>
            <div className='logo-container'>
                <img src={jobs.logoUrl} alt='Company Logo' />
            </div>
            <div className='job-details'>
                <div style={{ marginTop: '0.5rem' }}>
                    <h5>{jobs.jobPosition}</h5>
                </div>
                <div className='job-meta'>
                    <div className='job-meta-item'>
                        <img src={Persons} alt='Company Size' />
                        <p>1L+</p>
                    </div>
                    <div className='job-meta-item'>
                        <p>₹ {jobs.monthlySalary}</p>
                    </div>
                    <div className='job-meta-item'>
                        <img src={IndiaFlag} alt='Location' />
                        <p>{jobs.location}</p>
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', color: '#ED5353', gap: '1rem' }}>
                        <p>Office</p>
                        <p>{jobs.jobType}</p>
                    </div>
                </div>
            </div>
            <div className='job-actions'>
                <div className='job-tags'>
                    {jobs.skillsRequired.map((skill, index) => (
                        <span key={index} className='tag'>{skill}</span>
                    ))}
                </div>
                <div>
                    <button className='view-details-button' onClick={() => navigate(`/job/details/${jobs._id}`)}>View details</button>
                    {islogin && userData.isRecruiter && (
                        <button className='edit-details-button' onClick={() => navigate(`/job/details/${jobs._id}/edit`)}>Edit job</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobSection;
