/* eslint-disable react-hooks/exhaustive-deps */

import '../App.css'
import { useNavigate, useParams } from 'react-router';
import bgImg1 from '../assets/Rectangle 2.png';
import bgImg2 from '../assets/Rectangle 13.png';
import MoneyLogo from '../assets/ph_money-fill.png'
import CalendarLogo from '../assets/uis_calender.png'
import { useEffect, useState } from 'react';
import showToasts from './Toast';
import axios from 'axios';

function ViewDetails({ islogin, userData, isUserLogged }) {

    const { jobId } = useParams();
    const navigate = useNavigate();
    const [jobDetails, setJobDetails] = useState(null);

    console.log(jobId)

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`https://job-listing-server-7fp1.onrender.com/job/${jobId}`);
                setJobDetails(response.data.data);
                console.log(response.data.data)
                // console.log(jobDetails)
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        isUserLogged();
        fetchJobDetails();
    }, [jobId]);

    if (!jobDetails) {
        return <div>Loading...</div>;
    }

    const applyJobDetails = async () => {
        try {
            const usertoken = localStorage.getItem('userToken');
            console.log(usertoken);
            const response = await axios.post(
                `https://job-listing-server-7fp1.onrender.com/apply/${jobId}`,
                {}, // Body can be empty or include any data if required
                {
                    headers: {
                        Authorization: `Bearer ${usertoken}`
                    }
                }
            );
            console.log(response);
            if (response.data.status === 'Success') {
                showToasts(response.data.message, 'success');
                setTimeout(() => {
                    navigate('/job/feed')
                }, 2000)
            } else {
                showToasts(response.data.message, 'error');
            }
        } catch (error) {
            console.error('Error applying job :', error);
            if(error.response.data.message === 'Token not found or invalid') {
                showToasts('Please login to apply', 'error');
            }
            else {
                showToasts(error.response.data.message, 'error');
            }
        }
    };
    

    const handleLogout = () => {
        try {
          // Clear user token or session
          localStorage.removeItem('userToken');
          navigate('/login');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

    return (
        <>
            <div className='container' style={{ backgroundColor: '#FFEFEF', }}>

                <div className='header' style={{ zIndex: 10 }}>
                    <div>
                        <p>Job Finder</p>
                        <img style={{ position: 'relative', bottom: '1.5rem', left: '0rem' }} src={bgImg1} alt='' />
                    </div>

                    <div style={{ position: 'relative', bottom: '0rem' }}>
                        <img src={bgImg2} alt='' />
                    </div>

                    {islogin ? (<div className='header-sec'>
                        <div style={{ margin: '1rem' }}>
                            <button onClick={handleLogout} style={{ color: 'white', background: 'transparent', border: 'none' }}>Logout</button>
                        </div>
                        <div style={{ margin: '1rem' }}>
                            Hello! {userData.isRecruiter ? 'Recruiter' : 'Candidate'}
                        </div>
                    </div>)

                        : (<div className='header-sec'>
                            <div style={{ margin: '1rem' }}>
                                <button style={{ border: '1px solid #fff', background: 'transparent', color: 'white', fontSize: '1em', cursor: 'pointer' }}
                                    onClick={() => navigate('/login')}
                                >Login</button>
                            </div>
                            <div style={{ margin: '1rem' }}>
                                <button style={{ backgroundColor: '#fff', color: '#ED5353', border: '2px', fontSize: '1em', cursor: 'pointer' }}
                                    onClick={() => navigate('/register')}
                                >Register</button>
                            </div>
                        </div>)}
                </div>
                <div style={{ position: 'relative', bottom: '4rem', zIndex: '999' }}>

                    <div className='job-header'>
                        <h3 style={{ margin: '2rem', fontSize: '0.8em', textAlign: 'center' }}>
                            {jobDetails.jobPosition} work from office job/internship at {jobDetails.companyName}
                        </h3>
                    </div>

                    <div className='job-card'>
                        <div className='job-card-item'>
                            <p>1w ago .</p>
                            <p>{jobDetails.jobType} .</p>
                            <img src={jobDetails.logoUrl} alt='' style={{ width: '1rem', height: '1rem', margin: '0.5rem 0' }} />
                            <div>
                                <p>{jobDetails.companyName}</p>
                            </div>
                        </div>

                        <div className='job-card-header'>
                            <div>
                                <h2>{jobDetails.jobPosition}</h2>
                                <p style={{ color: '#ED5353', position: 'relative', bottom: '1rem', fontSize: '0.7em' }}>Bangalore | {jobDetails.location}</p>
                            </div>
                            {islogin && userData.isRecruiter ? (<button> Edit Job </button>) : (<button onClick={ applyJobDetails}> Apply Job </button>)}
                        </div>

                        <div className='job-card-item-1'>
                            <div>
                                <div style={{ display: 'flex', gap: '0.2rem' }}>
                                    <img src={MoneyLogo} alt='' style={{ width: '1rem', height: '1rem' }} />
                                    <p style={{ marginTop: '0px' }}>Stipend</p>
                                </div>
                                <div>
                                    Rs {jobDetails.monthlySalary}/month
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', gap: '0.2rem' }}>
                                    <img src={CalendarLogo} alt='' style={{ width: '1rem', height: '1rem' }} />
                                    <p style={{ marginTop: '0px' }}>Duration</p>
                                </div>
                                <div>
                                    6 months
                                </div>
                            </div>
                        </div>

                        <div className='job-card-item-2'>
                            <h5>About company</h5>
                            <p>
                                {jobDetails.aboutCompany}
                            </p>
                        </div>

                        <div className='job-card-item-2'>
                            <h5>About the job/internship</h5>
                            <p style={{ marginBottom: '3rem' }}>
                                {jobDetails.jobDescription}
                            </p>

                        </div>

                        <div style={{ margin: '1rem' }}>
                            <h5>Skill(s) Required</h5>

                            <div style={{ display: 'flex' }}>
                                {jobDetails.skillsRequired.map((skill, ind) => (

                                    <p key={ind} className='skill-item'>{skill}</p>
                                ))}
                            </div>

                        </div>

                        <div className='job-card-item-2' style={{ paddingBottom: '2rem' }}>
                            <h5>Additional Information</h5>

                            <p>
                                {jobDetails.additionalInformation}
                            </p>

                        </div>


                    </div>
                </div>

            </div>
        </>
    )
}

export default ViewDetails