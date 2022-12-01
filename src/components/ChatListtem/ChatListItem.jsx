import './ChatListItem.css';
import * as inboxAPI from '../../utilities/inbox-api';
import * as messagesAPI from '../../utilities/messages-api';
import { useState, useEffect, useRef } from 'react';
import MediaQuery from 'react-responsive';


export default function ChatListItem({ inbox, user, handleInboxClick, handleRemoveInbox, lastMessage, setLastMessage, allMessages, mess }, ref) {
    const [secondUser, setSecondUser] = useState({});
    const [message, setMessage] = useState(null);
    // const [messages] = useRef();


    useEffect(function() {
        (async function() {
            setLastMessage(lastMessage);
        })();
    }, [lastMessage])

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
