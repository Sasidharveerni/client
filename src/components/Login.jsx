import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/image 466.png'
import showToasts from './Toast';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState('');

    const navigate = useNavigate();


    const resetData = () => {
        setEmail('');
        setPassword('');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const response = await axios.post('http://localhost:5000/login', {email, password})
           console.log(response.data)
           if(response.data.status === 'Success') {
             setErrors('');
             localStorage.setItem('userToken', response.data.token)
             localStorage.setItem('userEmail', email);
             
         
             showToasts(response.data.message, 'success')
              navigate('/job/feed')
          
            //  alert(response.data.message)
            
            
           }
        } catch (error) {
            console.log(error);
            // setErrors(error.response.data.message)
          }
            resetData();
    }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{margin: '0 3rem'}}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3 style={{fontSize: '1.5em', marginBottom: '0rem'}}>Already have an account</h3>
                        <p style={{fontSize: '0.8em', color: '#525252', marginBottom: '1rem'}}>Your personal job finder is here</p>
                        {errors && <span style={{color: 'red'}}>{errors}</span>}
                    </div>
                    
                    <div style={{marginBottom: '0.8rem'}}>
                        <input type='text' placeholder='  Email' value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        style={{height: '2rem', width: '20rem'}}
                        />
                    </div>
                    
                    <div style={{marginBottom: '0.8rem'}}>
                        <input type='text' placeholder='  Password' value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        style={{height: '2rem', width: '20rem'}}
                        />
                    </div>
                    
                        <button type='submit' style={{color: '#fff', backgroundColor: '#ED5353', height: '3rem', width: '8rem', border: 'transparent'}}>Sign in</button>
                    <div>
                        <p>Don't have an account? 
                        <span style={{cursor: 'pointer', fontWeight: 'bold', color: 'black'}}>
                            <NavLink to='/register'>
                            Sign up
                            </NavLink>
                        </span>
                        </p>
                    </div>
                </form>
            </div>

            <div>
                <h4 style={{color: '#fff', position: 'absolute', right: '8rem'}}>Your Personal Job Finder</h4>
                <img src={logo} alt='' style={{ width: '40vw', height: '99vh' }} />
            </div>
        </div>
  )
}

export default Login