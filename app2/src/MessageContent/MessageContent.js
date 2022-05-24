import axios from "axios";
import { useEffect, useState } from "react";
import Message from "../Message/Message";

export function MessageContent(props) {


    const [messageList, setMessageList] = useState(null);
    useEffect(() => {
        setMessageList(null)
        axios.get("http://localhost:7000/api/contacts/" + props.currentChat.contact.id + "/messages?username=" + props.loggedInUser)
            .then((messagesList) => {
                console.log(messagesList.data);
                setMessageList(messagesList.data);
            })
    }, [props.currentChat.contact.id])


    if (messageList === null) {
        return <h1>loading</h1>
    }
    return (
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
    );
}

export default MessageContent;