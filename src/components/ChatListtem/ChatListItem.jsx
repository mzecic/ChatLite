import './ChatListItem.css';
import * as inboxAPI from '../../utilities/inbox-api';
import * as messagesAPI from '../../utilities/messages-api';
import { useState, useEffect, useRef } from 'react';


export default function ChatListItem({ inbox, user, handleInboxClick, handleRemoveInbox, lastMessage, setLastMessage }, ref) {
    const [secondUser, setSecondUser] = useState({});
    const [inboxMessages, setInboxMessages] = useState([]);

    useEffect(function() {
        (async function(){
            const messages = await messagesAPI.getMessages(inbox._id);
            setInboxMessages(messages);
            console.log(messages);
            setLastMessage(messages[messages.length - 1])
        })();
    }, [user])

    useEffect(function() {
        (async function() {
                const secondUserId = inbox.users.find(userId => userId !== user._id);
                const fetchUser = await inboxAPI.getSecondUser(secondUserId);
                setSecondUser(fetchUser[0])
        })();
}, [])

    function handleMouseEnter(e) {
       e.target.children[1].classList.remove('hidden')
    }

    function handleMouseLeave(e) {
        e.target.children[1].classList.add('hidden')
    }

    return(
        <div onMouseLeave={(e => handleMouseLeave(e))} onMouseEnter={(e) => handleMouseEnter(e)} onClick={(e) => handleInboxClick(e, inbox)} className="chat-item">
            <span className="chat-item-content">{secondUser.name}</span><button onClick={(e) => handleRemoveInbox(e)} className={ `hidden ${inbox._id}`} id="delete-chat" type="submit">X</button>
            {lastMessage ?
            <>
            {lastMessage.inboxId === inbox._id ?
            <>
                {lastMessage.senderId === user._id ?
                    <span className="last-message">You: {lastMessage.content.slice(0, 11)}...</span>
                :
                    <span className="last-message">{secondUser.name}: {lastMessage.content.slice(0, 11)}...</span>
                }
            </>
            :
            <span></span>
            }
             </>
            :
            <p></p>
        }
        </div>
    )
}
