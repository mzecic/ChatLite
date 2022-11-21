import { useState } from 'react';

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
                        <p>{message.content}</p>
                    </div>
                }
            </div>
        )
}
