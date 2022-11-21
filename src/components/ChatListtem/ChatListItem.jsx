import './ChatListItem.css';
import * as inboxAPI from '../../utilities/inbox-api';
import { useState, useEffect } from 'react';

export default function ChatListItem({ inbox, user, handleInboxClick }) {
    const [secondUser, setSecondUser] = useState({});

    useEffect(function() {
        (async function() {
                const secondUserId = inbox.users.find(userId => userId !== user._id);
                const fetchUser = await inboxAPI.getSecondUser(secondUserId);
                setSecondUser(fetchUser[0])
        })();
}, [])

    return(
        <div onClick={(e) => handleInboxClick(e, inbox)} className="chat-item">
            <p className="chat-item-content">{secondUser.name}</p>
        </div>
    )
}
