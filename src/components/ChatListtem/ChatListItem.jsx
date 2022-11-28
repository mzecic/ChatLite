import './ChatListItem.css';
import * as inboxAPI from '../../utilities/inbox-api';
import { useState, useEffect, useRef } from 'react';


export default function ChatListItem({ inbox, user, handleInboxClick, handleRemoveInbox }, ref) {
    const [secondUser, setSecondUser] = useState({});

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
            <span className="chat-item-content">{secondUser.name}</span><button onClick={(e) => handleRemoveInbox(e)} className={ `hidden ${inbox._id}`} id="delete-chat" type="submit">-</button>
            <p></p>
        </div>
    )
}
