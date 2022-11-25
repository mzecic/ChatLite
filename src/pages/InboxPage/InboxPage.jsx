import './InboxPage.css';
import { useState, useEffect, useRef } from 'react';
import * as inboxAPI from '../../utilities/inbox-api';
import * as usersAPI from '../../utilities/users-api';
import ChatList from '../../components/ChatList/ChatList';
import UserList from '../../components/UserList/UserList';
import InboxSection from '../../components/InboxSection/InboxSection';
import socket from '../../utilities/socket';

export default function InboxPage({ user }) {
    const [inboxes, setInboxes] = useState([]);
    const [selectedInbox, setSelectedInbox] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const usersOnline = useRef([]);




    useEffect(function() {
        (async function() {
                const allUsers = await usersAPI.getAllUsers();
                console.log(allUsers);
                setAllUsers(allUsers);
                console.log(allUsers)
                socket.emit('register-user', user._id, allUsers);
                socket.on('get-users', function(users) {
                    usersOnline.current = [...users]
                    setOnlineUsers(usersOnline.current);
                    console.log(usersOnline)
                    const onlineUsersIds = usersOnline.current.map(user => user.userId)
                    // const onlineUsersObj = allUsers.map(user => {
                    //     if(onlineUsersIds.includes(user._id)) {
                    //         return user;
                    //     }
                    // }).filter(user => user !== undefined)
                    // console.log(onlineUsersObj);
                    setOnlineUsers(allUsers.map(user => {
                        if(onlineUsersIds.includes(user._id)) {
                            return user;
                        }
                    }).filter(user => user !== undefined))
                })
        })();
    }, [])


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
                notifications={notifications}
                selectedInbox={selectedInbox}
                user={user}/>
                <UserList allUsers={allUsers} onlineUsers={onlineUsers} setAllUsers={setAllUsers} />
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
