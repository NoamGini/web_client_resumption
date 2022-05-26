import './Message.css';
export function Message(props) {

    const date = new Date(props.time);
    const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), date.getMinutes()];
    let timeStr = `${day}/${month}/${year} | ${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; 


    return (
        <p className={`chat-message ${props.sent === true  ? "chat-sent" : ''}`}>{props.message}<span className="chat-timestamp">{timeStr}</span></p>
    )
}

export default Message;
  