import React, { useState } from 'react'
import logo from '../assets/image 466.png'
import axios from 'axios';
import Toast from './Toast';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState('');

    const [check, setCheck] = useState(false);

    const [errors, setErrors] = useState('');

    const navigate = useNavigate();


    const resetData = () => {
        setEmail('');
        setName('');
        setName('')
        setMobile('');
        setPassword('');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const response = await axios.post('http://localhost:5000/register', {name, email, password})
           console.log(response.data)
           if(response.data.status === 'Success') {
             setErrors('');
             setTimeout(() => {
                navigate('/jobs')
                }, 2000);
            <Toast message={response.data.message} type='success' />
           }
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data.message)
          }
            resetData();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{margin: '0 3rem'}}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3 style={{fontSize: '1.5em', marginBottom: '0rem'}}>Create an account</h3>
                        <p style={{fontSize: '0.8em', color: '#525252', marginBottom: '1rem'}}>Your personal job finder is here</p>
                        {errors && <span style={{color: 'red'}}>{errors}</span>}
                    </div>
                    <div style={{marginBottom: '0.8rem'}}>

                        <input type='text' placeholder='  Name' value={name}
                            onChange={(e) => setName(e.target.value)}
                        style={{height: '2rem', width: '20rem'}}
                        />
                    </div>
                    <div style={{marginBottom: '0.8rem'}}>
                        <input type='text' placeholder='  Email' value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        style={{height: '2rem', width: '20rem'}}
                        />
                    </div>
                    <div style={{marginBottom: '0.8rem'}}>
                        <input type='text' placeholder='  Mobile' value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        style={{height: '2rem', width: '20rem'}}
                        />
                    </div>
                    <div style={{marginBottom: '0.8rem'}}>
                        <input type='text' placeholder='  Password' value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        style={{height: '2rem', width: '20rem'}}
                        />
                    </div>
                    <div style={{marginBottom: '0.8rem', fontSize: '0.8em', color: '#525252'}}>
                        <input type='checkbox' checked={check} onChange={(e) => setCheck(e.target.checked)}/>
                        <label>By creating an account, I agree to our terms of use and privacy policy</label>
                        <div>
                        {!check && <span style={{color: 'red'}}>Please accept our Terms & Conditions</span>}
                        </div>
                    </div>
                        <button type='submit' style={{color: '#fff', backgroundColor: '#ED5353', height: '3rem', width: '8rem', border: 'transparent'}}>Create Account</button>
                    <div>
                        <p>Already have an account? 
                        <span style={{cursor: 'pointer', fontWeight: 'bold', color: 'black'}}>
                            <NavLink to='/login'>
                            Sign in
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

export default Signup