import React, { useEffect, useState } from 'react';
import "./contact.css";
import Logo from '../assets/logo.svg'

const Contacts = ({ contacts, currentUser ,changeChat}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    // console.log(contacts);
    (async () => {
      if (currentUser) {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
      }
    })();
  }, [currentUser]);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }
  return (
    <>
      {

        currentUserName && currentUserImage
        && (
          <div className="Container3">
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>Chat App</h3>
            </div>

            <div className="contacts">
              {
                contacts.map((contact, index) => {
                  return (
                    <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index}
                      onClick={()=>changeCurrentChat(index,contact)}
                    >
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt="avatar"
                          key={index}
                        />
                        {/* <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}}`}
                          alt="avatar"
                          key={index}
                        /> */}
                      </div>

                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>

                    </div>
                  )
                })
              }
            </div>

            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>

            </div>

          </div>

        )
      }
    </>
  )
}

export default Contacts;