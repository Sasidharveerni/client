import React, { useEffect, useState } from 'react'
import '../App.css'
import bgImg1 from '../assets/Rectangle 2.png';
import bgImg2 from '../assets/Rectangle 13.png';
import DropDownFilter from '../components/DropDownFilter';
import JobSection from '../components/JobSection';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';

function MainPage({islogin}) {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    validateUser()
  }, [])

  const validateUser = async() => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/jobs')
      setJobs(response.data.data)
      // console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }


  
  return (
    <>
    <div className='container'>
     
     <div className='header'>

      {loading && <Loader /> }

      <div>
        <p>Job Finder</p>
        <img style={{position: 'relative', bottom: '1.5rem', left: '0rem'}} src={bgImg1} alt='' />
      </div>

      <div style={{position: 'relative', bottom: '0rem'}}>
        <img src={bgImg2} alt='' />
      </div>

      {islogin ? (<div className='header-sec'>
        <div style={{margin: '1rem'}}>
          <button style={{color: 'white', background: 'transparent', border: 'none'}}>Logout</button>
        </div>
        <div style={{margin: '1rem'}}>
          Hello! Recruiter
        </div>
      </div>)

      : (<div className='header-sec'>
        <div style={{margin: '1rem'}}>
          <button style={{border: '1px solid #fff', background: 'transparent', color: 'white', fontSize: '1em', cursor: 'pointer'}}
          onClick={() => navigate('/login')}
          >Login</button>
        </div>
        <div style={{margin: '1rem'}}>
          <button style={{backgroundColor: '#fff', color: '#ED5353', border: '2px', fontSize: '1em', cursor: 'pointer'}}
          onClick={() => navigate('/register')}
          >Register</button>
        </div>
      </div>)

      }

      
     </div>

     <div className='search-section'>
      <div style={{textAlign: 'center', margin: '1rem 0'}}>
      <i class="fas fa-search"></i>
       <input type='text' placeholder='            Type any job title' className='search-bar'/>
        <DropDownFilter />
      </div>

     </div>
      
      {jobs && jobs.map((job, ind) => (<JobSection key={ind} jobs={job} islogin={islogin}/>))}

     

    </div>

     </>
      
  )
}

export default MainPage