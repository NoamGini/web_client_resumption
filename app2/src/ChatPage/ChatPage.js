import './ChatPage.css';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Contacts from '../Contacts/Contacts';
import { useLocation } from 'react-router-dom';
import MessageContainer from '../MessageContainer/MessageContainer';
import axios from 'axios';

export function ChatPage() {

    const location = useLocation();

    const [currentWindow, setCurrentWindow] = useState(null);
    const [contactsList, setContactsList] = useState(null);

       useEffect(() => {
            getContacts(location.state.username)
                .then((contactsList) => {
                    setContactsList(contactsList);
                }) 
              
        }, []);

    async function postContact(usernameOfUser, nameOfContact, nicknameOfContact, server) {
        try {
            await axios.post("http://localhost:7000/api/Contacts", {
                contactName: nameOfContact,
                username: usernameOfUser, contactNickname: nicknameOfContact, contactServer: server
            })
            return;
        }
        catch (error) {
            if (error.message === "Request failed with status code 404") {
                alert("user doesn't exist");
            }
            else if (error.message === "Request failed with status code 400"){
                alert("You can not open a chat with yourself!");
            }
        }
    }

    async function getContacts(usernameOfUser) {
        try {
            var response = await axios.get("http://localhost:7000/api/Contacts?username=" + usernameOfUser)
            return response.data;
        }
        catch {
        }
    }

    const closeButton = useRef();

    async function AddContact() {
        var contactName = document.getElementById("Username").value;
        var contactNickname = document.getElementById("Nickname").value;
        var server = document.getElementById("Server").value;
        await postContact(location.state.username, contactName, contactNickname, server)
       
        document.getElementById("Username").value = "";
        document.getElementById("Nickname").value = "";
        document.getElementById("Server").value = "";

        closeButton.current.click();

        let currentList =  await getContacts(location.state.username);
        setContactsList(currentList);
    }

    return (
        <div className="chat-container">
            <div className="chat-block">
                <div className="sidebar">
                    <div className="header">
                        <div className="message-header-content">
                            <h4>{location.state.username}</h4>
                        </div>
                        <div className="chat-header-right">
                            <a href="#myModal" role="button" className="button" data-bs-toggle="modal">
                                <i className="bi bi-chat-left-text-fill"></i>
                            </a>
                            <div id="myModal" className="modal fade" tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Add new contact</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeButton}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-floating very-cool-margin">
                                                <input type="username" className="form-control" id="Username" placeholder="text" required></input>
                                                <label htmlFor="floatingInput">Username</label>
                                            </div>
                                            <div className="form-floating very-cool-margin">
                                                <input type="nickname" className="form-control" id="Nickname" placeholder="text" required></input>
                                                <label htmlFor="floatingInput">Nickname</label>
                                            </div>
                                            <div className="form-floating very-cool-margin">
                                                <input type="server" className="form-control" id="Server" placeholder="text" required></input>
                                                <label htmlFor="floatingInput">Server</label>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={AddContact}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-chats">
                        {contactsList === null ? <h4> </h4> : contactsList.map((contact, key) => <Contacts
                            contact={contact}       
                            setCurrentWindow={setCurrentWindow}
                            loggedInUser={location.state.username}
                            setContactsList ={setContactsList}
                            contactsList = {contactsList}
                            
                            key={key} />
                        )}
                    </div>
                </div>
                <MessageContainer currentWindow={currentWindow}  loggedInUser={location.state.username} />
            </div>
        </div>
    );
}

export default ChatPage;