import openningWindow from './ChatPageImage.png'
import MessageContent from "../MessageContent/MessageContent";

function MessageContainer(props) {

    if (props.currentWindow === null) {
        return <img className="message-container" src={openningWindow} alt=""></img>
    }

    return (
        <div className="message-container">
            <div className="header">
                <div className="chat-title">
                    <div className="avatar">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                    </div>
                    <div className="message-header-content">
                        <h4>{props.currentWindow.contact.id}</h4>
                    </div>
                </div>
            </div>
            <MessageContent currentWindow={props.currentWindow} loggedInUser={props.loggedInUser} />
        </div>
    );
}
export default MessageContainer;