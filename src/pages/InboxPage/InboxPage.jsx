import './InboxPage.css';
import { useState, useEffect, useRef } from 'react';
import * as inboxAPI from '../../utilities/inbox-api';
import * as usersAPI from '../../utilities/users-api';
import * as messagesAPI from '../../utilities/messages-api';
import ChatList from '../../components/ChatList/ChatList';
import UserList from '../../components/UserList/UserList';
import InboxSection from '../../components/InboxSection/InboxSection';
import socket from '../../utilities/socket';
import { propTypes } from 'react-input-emoji';

export default function InboxPage({ user, navBar, setNavBar }) {
    const [inboxes, setInboxes] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedInbox, setSelectedInbox] = useState(null);
    const [lastMessage, setLastMessage] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const usersOnline = useRef([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [inboxToRemove, setInboxToRemove] = useState(null);
    const [clickedUser, setClickedUser] = useState(null);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    // const [allMessages, setAllMessages] = useState([]);


    let selectedInboxBackup = null;
    let selectedIn = document.querySelector('.selected-inbox');

    useEffect(function() {
        socket.emit('setup', user);
        socket.on('connection', function() {
            setSocketConnected(true);
        })
            // if(selectedInbox) {
            // socket.emit('join-chat', selectedInbox._id);
            // setTyping(false);
            // setIsTyping(false);
            // socket.on('typing', function(room) {
            //     if(selectedInbox._id === room) {
            //         console.log('typing\'s happening')
            //         setIsTyping(true);
            //     }

            // })
            // socket.on('typing-stopped', function(room) {
            //     console.log(room)
            //     console.log('what the heck')
            //     setIsTyping(false);
            // })
            // }
    }, []);

    useEffect(function() {
        (async function() {
            console.log('selectedInbox change is firing', selectedInbox)
                const updatedInbox = await inboxAPI.getInbox(selectedInbox);
                setSelectedInbox(updatedInbox);
                setMessages(updatedInbox.messages);
                selectedInboxBackup = selectedInbox;
        })();

    }, [])

    useEffect(function() {
        socket.on('message-receive', function(updatedInbox) {
            // let newMessage = updatedInbox.messages[updatedInbox.messages.length - 1];
            // console.log(selectedInbox, updatedInbox);
            if(!selectedInbox || selectedInbox._id !== updatedInbox._id) {
                let currentInboxes = [...inboxes];
                let inboxToUpdate = currentInboxes.find(inbox => inbox._id === updatedInbox._id);
                currentInboxes.splice(currentInboxes.indexOf(inboxToUpdate), 1);
                // currentInboxes.splice(currentInboxes.indexOf(inboxToUpdate), 0, updatedInbox)
                setInboxes([...currentInboxes, updatedInbox]);
                setSelectedInbox(selectedInbox);
                //notifications
                console.log('not in inbox');
            } else {
                // console.log(selectedIn, selectedInbox);
                    console.log('im getting the message');
                    // updatedInbox.messages.shift(0, updatedInbox.messages.length/2);
                    setSelectedInbox(updatedInbox);
                    document.querySelector('.messages-list').lastChild.scrollIntoView(false)
                    setLastMessage(lastMessage);
                    // setLastMessage(newMessage);
            }
        })
    })


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


        })();
    }, [user])

    useEffect(function() {
        socket.on('update-inbox', function(newInbox) {
            console.log(newInbox);
            setInboxes([...inboxes, newInbox]);
        })
    }, [inboxes]);

    useEffect(function() {
        selectedInboxBackup = selectedInbox;
        (async function() {
                const result = await inboxAPI.getInboxes(user._id);
                setInboxes(result);

                console.log('this use effect is firing', selectedInboxBackup);

                if(selectedInbox) {
                    socket.emit('join-chat', selectedInbox);
                    setTyping(false);
                    setIsTyping(false);
                    socket.on('typing', function(room) {
                        if(room._id === selectedInboxBackup._id) {
                            console.log(room, selectedInboxBackup)
                            console.log('typing\'s happening')
                            setIsTyping(true);
                        }
                    })
                    socket.on('typing-stopped', function(room) {
                        console.log('what the heck')
                        setIsTyping(false);
                    })

                    }

      })();
      }, [user, selectedInbox])




    async function handleRemoveInbox(e) {
        const removeInbox = inboxes.filter(inbox => {
            return e.target.classList[0] === inbox._id;
        })
        const result = await inboxAPI.removeInbox(removeInbox);
        setInboxToRemove(result);
        console.log(e.target.classList)
        const newInboxes = [...inboxes];
        newInboxes.pop(removeInbox);
        setInboxes([...newInboxes]);
        setSelectedInbox(null);
    }

    function handleInboxClick(e, inbox) {
        e.stopPropagation();
        let selectedInboxes = document.querySelectorAll('.selected-inbox');
        if(!e.target.classList.contains('selected-inbox')) {
            if(!e.target.matches('div')) {
                e.target.parentNode.classList.add('selected-inbox')
                selectedInboxes.forEach(inbox => inbox.classList.remove('selected-inbox'))
            } else if(e.target.matches('div')) {
                e.target.classList.add('selected-inbox');
                selectedInboxes.forEach(inbox => inbox.classList.remove('selected-inbox'))
            }
        }
        if(selectedInbox) {
            socket.emit('leave-room', selectedInbox._id);
        }
        
        setSelectedInbox(inbox);
        selectedInboxBackup = inbox;
    }

      async function handleUserClick(e) {
        const result = allUsers.filter(user => {
            if(e.target.classList.contains(`${user._id}`)) {
                return user;
            }
        })
        console.log(result);
        let inbox = null;
        for(let i = 0; i < inboxes.length; i++) {
            // if(inboxes[i].users.filter(userId => userId === user._id) && inboxes[i].users.filter(userId => userId === result[0]._id)) {
            //     inbox = inboxes[i];
            //     console.log(inbox)
            // }
            if(inboxes[i].users[0] === user._id && inboxes[i].users[1] === result[0]._id || inboxes[i].users[1] === user._id && inboxes[i].users[0] === result[0]._id) {
                inbox = inboxes[i];
            }
        }
        if(inbox) {
            setSelectedInbox(inbox);
            const inboxes = document.querySelectorAll('.chat-item');
            console.log(inboxes)
            inboxes.forEach(chat => {
                if(chat.classList.contains(inbox._id)) {
                    let selectedInboxes = document.querySelectorAll('.selected-inbox');
                    selectedInboxes.forEach(inbox => inbox.classList.remove('selected-inbox'))
                    chat.classList.add('selected-inbox');
                }
            })
            // handleInboxClick(e, inbox)
            inbox = null;
        } else {
            const newInbox = await inboxAPI.createInbox([user._id, result[0]._id]);
            setInboxes([...inboxes, newInbox]);
            setSelectedInbox(newInbox);
            socket.emit('new-inbox', newInbox, result);
        }


        setClickedUser(result[0]._id);
      }

    return (
        <div className="inbox-div">
            {inboxes.length || user ?
            <>
                {inboxes.length ?
                    <ChatList navBar={navBar} setNavBar={setNavBar} lastMessage={lastMessage} setLastMessage={setLastMessage} inboxes={inboxes} user={user} handleInboxClick={handleInboxClick} handleRemoveInbox={handleRemoveInbox}/>
                :
                    <div className="left-div">This is where your current chats will show</div>
                }

                <InboxSection
                socketConnected={socketConnected}
                typing={typing}
                setTyping={setTyping}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
                setSelectedInbox={setSelectedInbox}
                lastMessage={lastMessage}
                setLastMessage={setLastMessage}
                messages={messages}
                setMessages={setMessages}
                notifications={notifications}
                selectedInbox={selectedInbox}
                user={user}/>
                <UserList navBar={navBar} setNavBar={setNavBar} allUsers={allUsers} onlineUsers={onlineUsers} setAllUsers={setAllUsers} handleUserClick={handleUserClick} currentUser={user}/>
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
