import axios from "axios";
import { useEffect, useState } from "react";
import Message from "../Message/Message";

export function MessageContent(props) {

    const [messageList, setMessageList] = useState(null);
    useEffect(() => {
        console.log("hellllo")
        setMessageList(null)
        axios.get("http://localhost:7000/api/contacts/" + props.currentWindow.contact.id + "/messages?username=" + props.loggedInUser)
            .then((messagesList) => {
                setMessageList(messagesList.data);
            })
    }, [props.currentWindow])

    async function getContacts(usernameOfUser) {
        try {
            var response = await axios.get("http://localhost:7000/api/Contacts?username=" + usernameOfUser)
            return response.data;
        }
        catch {
        }
    }

    async function getMessages() {
        try {
            var response = await axios.get("http://localhost:7000/api/contacts/" + props.currentWindow.contact.id + "/messages?username=" + props.loggedInUser)
            return response.data;
        }
        catch {
        }
    }

    async function postMessage(usernameOfUser, messageContent) {
        try {
            await axios.post("http://localhost:7000/api/contacts/" + props.currentWindow.contact.id + "/messages",
                { username: usernameOfUser, content: messageContent })
            return;
        }
        catch (error) {
            if (error.message === "Request failed with status code 400") {
                alert("did not worked");
            }
            if (error.message === "Request failed with status code 404") {
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
        const newMessage = document.getElementById("textMessage").value;
        await postMessage(props.loggedInUser, newMessage);
        document.getElementById("textMessage").value = "";
        let currentList = await getMessages(props.loggedInUser);
        setMessageList(currentList);
        var contacts = await getContacts(props.loggedInUser)
        props.currentWindow.setContactsList(contacts);
    }

    function onKeyDownHandler(e) {
        if (e.key === "Enter") {
            textHandler(e);
        }
    }

    if (messageList === null) {
        return <h4> </h4>
    }

    console.log(messageList);
    return (
        <div className="messageSide">
            <div className="message-content" >
                <div className="messages-wrapper">
                    {messageList.map((messageObj, key) =>
                        <Message
                            message={messageObj.content}
                            time={messageObj.created}
                            sent={messageObj.sent}
                            key={key} />
                    )}
                </div>
            </div>
            <div className="message-footer">
                <input type="text" onKeyDown={onKeyDownHandler} placeholder="Type a message" id="textMessage" ></input>
            </div>
        </div>
    );
}

export default MessageContent;