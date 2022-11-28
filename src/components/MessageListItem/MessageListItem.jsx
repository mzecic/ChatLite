import { format } from 'timeago.js';
import './MessageListItem.css';



export default function MessageListItem({ message, user, secondUser }) {

    return(
        <div className="chat-row">
            {user ?
                <div className="message-wrapper-sender">
                    <div className="sender-message">
                        <p>{message.content}</p>
                    </div>
                    <p className="time-format">{ format(message.createdAt) }</p>
                </div>
            :
                <div className="message-wrapper-recipient">
                    <div className="recipient-message">
                        <p>{secondUser.name}</p>&nbsp;
                            <p>{message.content}</p>
                    </div>
                    <p className="time-format">{ format(message.createdAt) }</p>
                </div>
            }
        </div>
    )
}
