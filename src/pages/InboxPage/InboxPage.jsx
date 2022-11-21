import './InboxPage.css';
import { useState, useEffect, useRef } from 'react';
import * as inboxAPI from '../../utilities/inbox-api';
import ChatList from '../../components/ChatList/ChatList';
import InboxSection from '../../components/InboxSection/InboxSection';
import { io } from 'socket.io-client';

export default function InboxPage({ user }) {
    const [inboxes, setInboxes] = useState([]);
    const [selectedInbox, setSelectedInbox] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messageForSocket, setMessageForSocket] = useState(null);
    const [messageFromSocket, setMessageFromSocket] = useState(null);
    const socket = useRef();


    useEffect(function() {
        socket.current = io('http://localhost:8800');
        socket.current.emit('add-user', user._id);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        })
    }, [user])

    useEffect(() => {
        socket.current.on('get-message', function(message) {
            setMessageFromSocket(message)
        })
    }, [])

    useEffect(() => {
        if(messageForSocket !== null) {
            socket.current.emit('send-message', messageForSocket)
        }
    },[messageForSocket]);




    useEffect(function() {
        (async function() {
            try {
                const result = await inboxAPI.getInboxes(user._id);
                setInboxes(result);
            } catch(err) {
                console.log(err);
            }

      })();
      }, [user])

      function handleInboxClick(e, inbox) {
        // console.log(inbox)
        // console.log(e.target.innerText);
        setSelectedInbox(inbox)
      }

    return (
        <div className="inbox-div">
            {inboxes.length ?
            <>
                <ChatList inboxes={inboxes} user={user} handleInboxClick={handleInboxClick}/>
                <InboxSection
                messageFromSocket={messageFromSocket}
                setMessageForSocket={setMessageForSocket}
                selectedInbox={selectedInbox}
                user={user}/>
                <div className="right-div">Users</div>
            </>
            :
            <>
                <div className="left-div">This is where your current chats will show</div>
                <div className="middle-div">No Conversation Selected</div>
                <div className="right-div">Start a new conversation</div>
            </>
            }
        </div>
    )
}
