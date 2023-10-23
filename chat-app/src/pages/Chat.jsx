import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Chatcontainer from '../components/Chatcontainer';
import io from 'socket.io-client';
const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsloaded] = useState(false);
  const socket = useRef();

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsloaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);
            // console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        } else {
          navigate("/avatar");
        }
      }
    })();

  }, [currentUser]);



  const handleChatChnage = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <div className="Container1">
      <div className="container1">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChnage} />
        {
          isLoaded && (currentChat === undefined ?
            (<Welcome />) : (<Chatcontainer currentChat={currentChat} currentUser={currentUser} socket={socket} />))
        }
      </div>
    </div>
  )
}

export default Chat;