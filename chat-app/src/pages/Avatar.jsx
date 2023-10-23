import React, { useEffect, useState } from 'react';
import './avatar.css';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from 'buffer';

import { setAvatarRoute } from '../utils/APIRoutes';
const Avatar = () => {

  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();


  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };    


  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate("/login")
      }
    })();
  
  }, []);
   
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please Select an avatar ", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      try {
        for (let i = 0; i < 4; i++) {
          const randomId = Math.round(Math.random() * 1000);
          const response = await axios.get(`${api}/${randomId}`);
          const buffer = Buffer.from(response.data);
          const base64Image = buffer.toString("base64");
          data.push(base64Image);
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        // Handle error if necessary
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      {
        isLoading ? <div className="container">
          <img src={loader} alt="loader" className='loader' />
        </div> : (


          <div className="container">
            <div className="title-container">
              <h1>
                Pick an avatar as your profile picture
              </h1>
            </div>
            <div className="avatars">
              {
                avatars.map((avatar, index) => {
                  return (
                    <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                      <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
                        key={avatar}
                        onClick={() => setSelectedAvatar(index)} />
                    </div>
                  )
                })
              }
            </div>

            <button className='submit-btn' onClick={setProfilePicture}> Set as Profile Picture</button>
          </div>
        )
      }
      <ToastContainer />
    </>
  )
}

export default Avatar;
