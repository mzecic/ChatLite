import './ChatListItem.css';
import * as inboxAPI from '../../utilities/inbox-api';
import { useState, useEffect } from 'react';


export default function ChatListItem({ inbox, user, handleInboxClick, handleRemoveInbox }) {
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
        <div onMouseLeave={(e => handleMouseLeave)} onMouseEnter={(e) => handleMouseEnter(e)} onClick={(e) => handleInboxClick(e, inbox)} className="chat-item">
            <p className="chat-item-content">{secondUser.name}</p><button onClick={(e) => handleRemoveInbox(e)} className={inbox._id} id="delete-chat" type="submit">-</button>
        </div>
    )
}
