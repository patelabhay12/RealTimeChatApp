import React, { useState } from 'react';
import './chatinput.css';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';



const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    // const handleEmojiClick = (e, emojiObject) => {
    //     console.log(emojiObject.emoji);
    //     let message = msg;
    //     message += emojiObject.img;
    //     setMsg(message);
    // }

    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <>
            <div className='Container6'>
                <div className="button-container">
                    <div className="emoji">
                        <BsEmojiSmileFill onClick={() => { setShowEmojiPicker(!showEmojiPicker) }} />
                        <div className="emoji-picker-react">
                            {showEmojiPicker && <Picker onEmojiClick={(emojiObject) => setMsg((prevMsg) => prevMsg + emojiObject.emoji)}
                                height="350px"
                                theme="dark-theme"
                            />}
                        </div>

                    </div>
                </div>

                {/* <div className="input-container">
                    <input type="text" placeholder='type your message here' value={msg} onChange={(e) => { setMsg(e.target.value) }} />
                    <button className='submit'>
                        <IoMdSend />
                    </button>
                </div> */}



                <form className='input-container' onSubmit={(e) => sendChat(e)}>
                    <div >
                        <input
                            type="text"
                            placeholder="type your message here"
                            onChange={(e) => setMsg(e.target.value)}
                            value={msg}
                        />
                    </div>

                    <div>
                        <button type="submit">
                            <IoMdSend />
                        </button>
                    </div>
                    {/* </div> */}

                </form>

            </div>
        </>
    )
}

export default ChatInput;