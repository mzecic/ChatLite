import { useEffect, useState } from 'react';
import '../InboxSection/InboxSection.css';
import * as inboxAPI from '../../utilities/inbox-api';
import * as messagesAPI from '../../utilities/messages-api';
import MessageList from '../MessageList/MessageList';

export default function InboxSection({ selectedInbox, user }) {
    const [secondUser, setSecondUser] = useState({});
    const [messages, setMessages] = useState([]);

    useEffect(function() {
        (async function() {
            if (selectedInbox) {
                const secondUserId = selectedInbox.users.find(userId => userId !== user._id);
                const fetchUser = await inboxAPI.getSecondUser(secondUserId);
                setSecondUser(fetchUser[0])
            }
        })();
}, [selectedInbox, user])

    useEffect(function() {

    (async function() {
        if (selectedInbox) {
            const inboxMessages = await messagesAPI.getMessages(selectedInbox._id)
            setMessages(inboxMessages);
        }
    })();

}, [selectedInbox])

// console.log(user)
// console.log(selectedInbox)
// console.log(secondUser)
// console.log(messages)

    return(
        <div className="middle-div">
            {selectedInbox ?
            <>
                {messages.length ?
                <MessageList messages={messages} user={user} selectedInbox={selectedInbox} secondUser={secondUser}/>
                :
                <h1>Type below to start chatting</h1>
                }
            </>
            :
                <h1>Select a chat</h1>
            }
        </div>
    )
}
