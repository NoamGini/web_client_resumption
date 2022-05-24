import { useEffect, useState } from 'react';
import useRecorder from '../AudioRecorder/AudioRecorder';
import { addNewMessage } from "../DataBase/DataBase";
import axios from 'axios';
export function MessageFooter(props) {


    async function getMessages(usernameOfUser) {
        try {
             var response = await axios.get("http://localhost:7000/api/contacts/" + props.currentChat.contact.id + "/messages?username=" + props.loggedInUser)
            return response.data;   
        }
        catch {
        }
    }
    

    async function postMessage(usernameOfUser, content) {
        try {
            await axios.post("http://localhost:7000/api/contacts/" + props.currentChat.contact.id + "/messages", 
            { username: usernameOfUser, content: content})
            return;
        }
        catch (error) {
            if (error === 404) {
                alert("contact not found");
            }
        }
    }

    function onlySpaces(str) {
        return /^\s*$/.test(str);
    }

    async function textHandler(e) {
        if (onlySpaces(document.getElementById("textMessage").value)) {
            document.getElementById("textMessage").value = "";
            return;
        }
        
        const newMessage = [document.getElementById("textMessage").value, "text"];

        await postMessage(props.loggedInUser,newMessage);
        
        document.getElementById("textMessage").value = "";
        let currentList =  await getMessages(props.loggedInUser);
       // props.setMessageList(currentList);
        
      //  props.currentChat.setContactsList([...chatUpdate]);
    }

    function onKeyDownHandler(e) {
        if (e.key === "Enter") {
            textHandler(e);
        }
    }

    return (
        <div className="message-footer">
            <input type="text" onKeyDown={onKeyDownHandler} placeholder="Type a message" id="textMessage" ></input>
        </div>
    );
}

export default MessageFooter;