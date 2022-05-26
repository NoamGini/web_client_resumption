import axios from "axios";
import { useEffect, useState } from "react";
import Message from "../Message/Message";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { getDomain } from '../Domain/Domain';

export function MessageContent(props) {

    const domain = getDomain();

    const [connection, setConnection] = useState(null);
    const [messageList, setMessageList] = useState(null);

    useEffect(() => {
        setMessageList(null)
        axios.get("http://"+domain+"/api/contacts/" + props.currentWindow.contact.id + "/messages?username=" + props.loggedInUser)
            .then((messagesList) => {
                setMessageList(messagesList.data);
            })
    }, [props.currentWindow])

    useEffect(()=>{
        connect();
    }, [])

    if(connection !== null){
        connection.off("refresh");
        connection.on("refresh", async ()=>{
            let currentList = await getMessages(props.loggedInUser);
            setMessageList(currentList);
            var contacts = await getContacts(props.loggedInUser)
            props.currentWindow.setContactsList(contacts);
        });
    }

    async function connect(){
        const connection = new HubConnectionBuilder().withUrl("http://"+domain+"/Chat").build();
        await connection.start()
        setConnection(connection)
        await connection.invoke("connect", props.loggedInUser);
    }

    async function getContacts(usernameOfUser) {
        try {
            var response = await axios.get("http://"+domain+"/api/Contacts?username=" + usernameOfUser)
            return response.data;
        }
        catch {
        }
    }

    async function getMessages() {
        try {
            var response = await axios.get("http://"+domain+"/api/contacts/" + props.currentWindow.contact.id + "/messages?username=" + props.loggedInUser)
            return response.data;
        }
        catch {
        }
    }

    async function postMessage(usernameOfUser, messageContent) {
        try {
            await axios.post("http://"+domain+"/api/contacts/" + props.currentWindow.contact.id + "/messages",
                { username: usernameOfUser, content: messageContent })
            return ;
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

    async function transferMessage(usernameOfUser, nameOfContact, content) {
        try {
            await axios.post("http://" + props.currentWindow.contact.server + "/api/transfer",
                { from: usernameOfUser, to: nameOfContact, content: content })
            return 1;
        }
        catch (error) {
            if (error.message === "Request failed with status code 400") {
                alert("did not worked");
                return 0;
            }
            if (error.message === "Request failed with status code 404") {
                alert("contact not found");
                return 0;
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
        document.getElementById("textMessage").value = "";

        await postMessage(props.loggedInUser, newMessage);
        var result = await transferMessage(props.loggedInUser, props.currentWindow.contact.id, newMessage);
        if (result == 1) {
            let currentList = await getMessages(props.loggedInUser);
            setMessageList(currentList);
            var contacts = await getContacts(props.loggedInUser)
            props.currentWindow.setContactsList(contacts);
        }
        else{
            alert("did not worked");
        }
    }

    function onKeyDownHandler(e) {
        if (e.key === "Enter") {
            textHandler(e);
        }
    }

    if (messageList === null) {
        return <h4> </h4>
    }

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