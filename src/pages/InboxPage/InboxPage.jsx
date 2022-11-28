import './InboxPage.css';
import { useState, useEffect, useRef } from 'react';
import * as inboxAPI from '../../utilities/inbox-api';
import * as usersAPI from '../../utilities/users-api';
import ChatList from '../../components/ChatList/ChatList';
import UserList from '../../components/UserList/UserList';
import InboxSection from '../../components/InboxSection/InboxSection';
import socket from '../../utilities/socket';
import { propTypes } from 'react-input-emoji';

export default function InboxPage({ user }) {
    const [inboxes, setInboxes] = useState([]);
    const [selectedInbox, setSelectedInbox] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const usersOnline = useRef([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [inboxToRemove, setInboxToRemove] = useState(null);
    const [clickedUser, setClickedUser] = useState(null);




    useEffect(function() {
        (async function() {
                const allUsers = await usersAPI.getAllUsers();

                setAllUsers(allUsers);

                socket.emit('register-user', user._id, allUsers);
                socket.on('get-users', function(users) {
                    usersOnline.current = [...users]
                    setOnlineUsers(users);
                    const onlineUsersIds = users.map(user => user.userId)
                    setOnlineUsers(allUsers.map(user => {
                        if(onlineUsersIds.includes(user._id)) {
                            return user;
                        }
                    }).filter(user => user !== undefined))

                })
                socket.emit('setup', user);
                socket.on('connection', function() {
                    setSocketConnected(true);
                })
        })();
    }, [user])

    useEffect(function() {
        socket.on('update-inbox', function(newInbox) {
            console.log(newInbox);
            setInboxes([...inboxes, newInbox]);

        })
    }, [inboxes]);

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

    async function handleRemoveInbox(e) {
        const removeInbox = inboxes.filter(inbox => {
            return e.target.classList[0] === inbox._id;
        })
        const result = await inboxAPI.removeInbox(removeInbox);
        setInboxToRemove(result);
        console.log(e.target.classList)
        const newInboxes = [...inboxes];
        newInboxes.pop(result);
        setInboxes([...newInboxes]);
        setSelectedInbox(null);
    }

      function handleInboxClick(e, inbox) {
        // console.log(inbox)
        // console.log(e.target.innerText);
        setSelectedInbox(inbox)
      }


      async function handleUserClick(e) {
        const result = allUsers.filter(user => user._id === e.target.getAttribute('id'));
        console.log(result);
        setClickedUser(result);
        console.log(clickedUser);
        const newInbox = await inboxAPI.createInbox([user._id, result[0]._id]);
        setInboxes([...inboxes, newInbox]);
        setSelectedInbox(newInbox);
        socket.emit('new-inbox', newInbox, result);
      }

    return (
        <div className="inbox-div">
            {inboxes.length || user ?
            <>
                {inboxes.length ?
                    <ChatList inboxes={inboxes} user={user} handleInboxClick={handleInboxClick} handleRemoveInbox={handleRemoveInbox}/>
                :
                    <div className="left-div">This is where your current chats will show</div>
                }

                <InboxSection
                notifications={notifications}
                selectedInbox={selectedInbox}
                user={user}/>
                <UserList allUsers={allUsers} onlineUsers={onlineUsers} setAllUsers={setAllUsers} handleUserClick={handleUserClick} currentUser={user}/>
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
