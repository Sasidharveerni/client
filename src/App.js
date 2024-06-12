
import './App.css';
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './components/Loader'
import ViewDetails from './components/ViewDetails';
import AddJobPage from './pages/AddJobPage';

function App() {

  const [islogin, setIslogin] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    isUserLogged()
  }, [])

  const isUserLogged = async () => {
    setLoading(true);
    try {
      const usertoken = localStorage.getItem('userToken');
      if (usertoken) {
        const response = await axios.get('http://localhost:5000/user/login', {
          headers: {
            Authorization: `Bearer ${usertoken}`
          }
        });
        console.log(response);
        setIslogin(true)
      }

      else {
        setIslogin(false)
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }



  return (
     <BrowserRouter>
        {loading && <Loader />}
     <Routes>
      <Route path='/register' element={<Signup />} />
      <Route path='/' element={<MainPage islogin={islogin}/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/job/details/:jobId' element={<ViewDetails islogin={islogin}/>} />
      <Route path='/add/job' element={<AddJobPage />} />
     </Routes>
     <ToastContainer />
     </BrowserRouter>
  );
}

export default App;
