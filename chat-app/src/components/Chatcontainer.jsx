import React, { useEffect, useRef } from 'react';
import './chatcont.css';
import { useState } from 'react';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';
const Chatcontainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    useEffect(() => {
        (async () => {
            if (currentChat) {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setMessages(response.data);
            }
        })();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message:msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            {
                currentChat && (
                    <div className="Container5">
                        <div className="chat-header">
                            <div className="user-details">
                                <div className="avatar">

                                    <img
                                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                        alt=""
                                    />

                                </div>
                                <div className="username">
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        {/* <Messages /> */}
                        <div className="chat-messages">
                            {
                                messages.map((message, index) => {
                                    return (
                                        <div ref={scrollRef} key={uuidv4()}>
                                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                                <div className="content">
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>

                )
            }
        </>

    )
}

export default Chatcontainer;