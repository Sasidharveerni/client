/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import ProgressBar from '../components/ProgressBar';
import Loader from '../components/Loader';

function ApplicationPage({ userData }) {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDetailsPromises = userData.appliedJobs.map(jobId =>
          axios.get(`http://localhost:5000/job/${jobId}`)
        );
        const jobDetailsResponses = await Promise.all(jobDetailsPromises);
        const jobs = jobDetailsResponses.map(response => response.data.data);
        setAppliedJobs(jobs);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
      setLoading(false);
    };

    fetchJobDetails();
  }, [userData.appliedJobs]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='application-page'>
      <h2>My Applications</h2>
      <div className='applications-list'>
        {appliedJobs.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          appliedJobs.map((job, index) => (
            <div key={index} className='application-card'>
              <div className='application-header'>
                <img src={job.logoUrl} alt='Company Logo' className='company-logo' />
                <div>
                  <h3>{job.jobPosition}</h3>
                  <p>{job.companyName}</p>
                </div>
              </div>
              <ProgressBar status="application sent" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ApplicationPage;
