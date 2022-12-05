import './ChatListItem.css';
import * as inboxAPI from '../../utilities/inbox-api';
import { useState, useEffect } from 'react';



export default function ChatListItem({ inbox, user, handleInboxClick, handleRemoveInbox }) {
    const [secondUser, setSecondUser] = useState({});

    useEffect(function() {
        (async function() {
                const secondUserId = inbox.users.find(userId => userId !== user._id);
                const fetchUser = await inboxAPI.getSecondUser(secondUserId);
                setSecondUser(fetchUser[0]);
        })();
}, [])

    function handleMouseEnter(e) {
       e.target.children[1].classList.remove('hidden')
    }

    function handleMouseLeave(e) {
        e.target.children[1].classList.add('hidden')
    }

    return(
        <>
            <div onMouseLeave={(e => handleMouseLeave(e))} onMouseEnter={(e) => handleMouseEnter(e)} onClick={(e) => handleInboxClick(e, inbox)} className={`chat-item ${inbox._id}`}>
                <span className="chat-item-content">{secondUser.name}</span><button onClick={(e) => handleRemoveInbox(e)} className={ `hidden ${inbox._id}`} id="delete-chat" type="submit">X</button>
                <p className="notification-wrapper">
                    <span></span>
                </p>
                {inbox.messages[inbox.messages.length - 1] ?
                    <>
                        {inbox.messages[inbox.messages.length - 1].senderId === user._id ?
                            <span className="last-message">You: {inbox.messages[inbox.messages.length - 1].content.slice(0, 11)}...</span>
                        :
                            <>
                                {inbox.messages[inbox.messages.length - 1].senderId === secondUser._id ?
                                <span className="last-message">{secondUser.name}: {inbox.messages[inbox.messages.length - 1].content.slice(0, 11)}...</span>
                                :
                                <span></span>
                                }
                            </>
                        }
                    </>
                :
                    <span></span>
                }
            </div>
        </>
    )
}
