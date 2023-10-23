import React, { useEffect, useState } from 'react'
import './regi.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';
// import { json } from 'stream/consumers';
const Register = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);


    const toastOption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        theme: 'dark'
    };
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("password and confirm password should be same.", toastOption);
            return false;
        }
        else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOption);
            return false;
        }
        else if (password.length < 8) {
            toast.error("Password should be equal greater than 8 characters", toastOption);
            return false;
        } else if (email === "") {
            toast.error("email is required ", toastOption);
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        // e.preventDefult();
        e.preventDefault();
        if (handleValidation()) {
            const { email, username, password } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if (data.status === true) {
                // localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/login");
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
                    <input type="email"
                        placeholder='Email'
                        name='email'
                        onChange={(e) => handleChange(e)}
                    />
                    <input type="password"
                        placeholder='Password'
                        name='password'
                        onChange={(e) => handleChange(e)}
                    />
                    <input type="password"
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={(e) => handleChange(e)}
                    />
                    <button type='submit'>Create User</button>
                    <span>already have an account ? <Link to='/login'>login</Link></span>
                </form>
            </div>

            <ToastContainer />
        </>
    )
}



export default Register;