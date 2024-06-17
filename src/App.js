/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ViewDetails from './components/ViewDetails';
import AddJobPage from './pages/AddJobPage';
import ApplicationPage from './pages/ApplicationPage';
import UserPage from './pages/UserPage';


function App() {
  const [islogin, setIslogin] = useState(false);

  const [userData, setUserData] = useState(null);


  useEffect(() => {
    isUserLogged();
  }, []);

  const isUserLogged = async () => {
  
    try {
      const usertoken = localStorage.getItem('userToken');
      const useremail = localStorage.getItem('userEmail');
      console.log('function called')
      if (usertoken) {
        const response = await axios.post('http://localhost:5000/login/status', {
          email: useremail
        }, {
          headers: {
            Authorization: `Bearer ${usertoken}`
          }
        });
        if(response.data.status === 'Success') {

          setUserData(response.data.user);
          console.log(response.data.user)
          setIslogin(true);
        } 
      } else {
        setIslogin(false);
      }
    } catch (error) {
      console.log(error);
      setIslogin(false);
    }
    
  };

  return (
    <>

        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/job/feed' element={<MainPage islogin={islogin} userData={userData} isUserLogged={isUserLogged}/>} />
          <Route path='/job/details/:jobId' element={<ViewDetails islogin={islogin} userData={userData}  isUserLogged={isUserLogged}/>} />
          <Route path='/add/job' element={<AddJobPage />} />
          <Route path='/user/applications' element={<ApplicationPage userData={userData}/>} />
          <Route path='/user/profile' element={<UserPage userData={userData} isUserLogged={isUserLogged} />} />
        </Routes>
   
      <ToastContainer />
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
