import './Message.css';
export function Message(props) {

    const date =new Date(props.time);
    const [hour, minutes] = [date.getHours(), date.getMinutes()];
    let timeStr = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    console.log(props.from, props.loggedInUser);
    return (
        <p className={`chat-message ${props.sent === true  ? "chat-sent" : ''}`}>{props.message}<span className="chat-timestamp">{timeStr}</span></p>
    )
}

export default Message;