import React from 'react';
import './logout.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiPowerOff } from 'react-icons/bi';
const Logout = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        (async () => {
            localStorage.clear();
            navigate('/login');
        })();
    }
    return (
        <div className='button' onClick={handleClick}>
            <BiPowerOff className='logout-btn' />
        </div>
    )
}

export default Logout;