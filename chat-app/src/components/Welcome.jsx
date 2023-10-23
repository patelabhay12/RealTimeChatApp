import React, { useEffect, useState } from 'react';
import './welcome.css';
import Robot from '../assets/robot.gif';
const Welcome = () => {
    const [username, setUsername] = useState("");
    useEffect(() => {
        (async () => {
            setUsername(await JSON.parse(localStorage.getItem('chat-app-user')).username);
        }
        )()
    }, []);
    return (
        <>
            <div className="Container4">
                <img src={Robot} alt="" />
                <h1>Welcome , <span>{username}</span></h1>
                <h3>Please select a chat to Start message</h3>
            </div>
        </>
    )
}

export default Welcome;