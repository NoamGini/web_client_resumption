function Contacts(props) {

    let timeStr = ``;
    let lastMessage = "";

    if (props.contact.last !== null) {
        const date = new Date(props.contact.lastdate);
        const [hour, minutes] = [date.getHours(), date.getMinutes()];
        timeStr = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        if (props.contact.last.length > 20) {
            lastMessage = (props.contact.last).slice(0, 19) + "...";
        }
        else {
            lastMessage = props.contact.last;
        }

    }
    function openChatWindow() {
        props.setCurrentWindow({
            contact: props.contact,
            setContactsList: props.setContactsList,
            contactsList: props.contactsList,
        });
    }

    return (
        <div className="sidebar-chat" onClick={openChatWindow}>
            <div className="avatar">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""></img>
            </div>
            <div className="chat-info">
                <h4>{props.contact.name}</h4>
                <div>
                    {props.contact.last === null ? <p></p> : <p>{lastMessage}</p>}
                </div>
            </div>
            <div className="time">
                {props.contact.lastdate === null ? <p></p> : <p>{timeStr}</p>}
            </div>
        </div>
    );
}

export default Contacts;