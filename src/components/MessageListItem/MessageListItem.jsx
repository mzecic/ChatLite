import { useState } from 'react';
import { format } from 'timeago.js';



export default function MessageListItem({ message, user, secondUser }) {


        return(
            <div className="chat-row">
                {user ?
                    <div className="your-message">
                        <p>You</p>
                        <p>{message.content}</p>
                    </div>
                :
                    <div className="recipient-message">
                        <p>{secondUser.name}</p>
                        <div>
                            <p>{message.content}</p>
                            <p>{ format(message.createdAt) }</p>
                        </div>
                    </div>
                }
            </div>
        )
}
