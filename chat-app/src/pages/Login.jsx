import React, { useEffect, useState } from 'react'
import './regi.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';
// import { json } from 'node:stream/consumers';
const Login = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });


  useEffect(() => {
    (async () => {
      if (localStorage.getItem('chat-app-user')) {
        navigate("/")
      }
    })();
  })

    const toastOption = {
      position: 'bottom-right',
      autoClose: 8000,
      pauseOnHover: true,
      theme: 'dark'
    };



    const handleValidation = () => {
      const { password, username } = values;
      if (username.length === "") {
        toast.error("Password should be equal greater than 8 characters", toastOption);
        return false;
      }
      else if (password.length === "") {
        toast.error("Password should be equal greater than 8 characters", toastOption);
        return false;
      }
      return true;
    }

    const handleSubmit = async (e) => {
      // e.preventDefult();
      e.preventDefault();
      if (handleValidation()) {
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password
        });

        if (data.status === false) {
          toast.error(data.msg, toastOption);
        }
        if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
          navigate("/avatar");
        }
      }
    }
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
      <>
        <div className='FormContainer'>
          <form onSubmit={(e) => { handleSubmit(e) }}>
            <div className="brand">
              <img src={Logo} alt="logo hai bhai ..." />
              <h1>Chat App</h1>
            </div>
            <input type="text"
              placeholder='Username'
              name='username'
              onChange={(e) => handleChange(e)}

            />
            <input type="password"
              placeholder='Password'
              name='password'
              onChange={(e) => handleChange(e)}
            />
            <button type='submit'>Login</button>
            <span>Don't have an account ? <Link to='/register'>register</Link></span>
          </form>
        </div>

        <ToastContainer />

      </>
    )
  }



export default Login;