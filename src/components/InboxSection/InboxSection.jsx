import { useEffect, useState, useRef } from 'react';
import '../InboxSection/InboxSection.css';
import * as inboxAPI from '../../utilities/inbox-api';
import * as messagesAPI from '../../utilities/messages-api';
import MessageList from '../MessageList/MessageList';
import InputEmoji from "react-input-emoji";
import { IoSendOutline, IoChevronForwardSharp } from 'react-icons/io5';
import socket from '../../utilities/socket';




export default function InboxSection({ selectedInbox, user, notifications, setNotifications, messages, setMessages, lastMessage, setLastMessage }) {
    const [secondUser, setSecondUser] = useState({});
    const [text, setText] = useState('');



    // let selectedInboxBackup = null;


    // useEffect(function() {

    //     (async function() {
    //         if (selectedInbox) {
    //             const inboxMessages = await messagesAPI.getMessages(selectedInbox._id)
    //             setMessages(inboxMessages);
    //             socket.emit('join-chat', selectedInbox._id);
    //             selectedInboxBackup = selectedInbox;
    //         }
    //     })();

    // }, [selectedInbox])


    // useEffect(function() {
    //     socket.on('message-receive', function(newMessage, previousMessages) {
    //         if(!selectedInboxBackup || selectedInboxBackup._id !== newMessage.inboxId) {
    //             //notifications
    //             console.log('not in inbox currently');
    //             // console.log(selectedInboxBackup._id);
    //             // setLastMessage(newMessage);
    //         } else if(selectedInbox._id === newMessage.inboxId) {
    //             console.log('fires when im not here');
    //             console.log(selectedInbox._id);
    //             setMessages([...messages, newMessage]);
    //             // setLastMessage(newMessage);
    //         }
    //     })
    // }, [selectedInbox])



    useEffect(function() {
        (async function() {
            if (selectedInbox) {
                const secondUserId = selectedInbox.users.find(userId => userId !== user._id);
                const fetchUser = await inboxAPI.getSecondUser(secondUserId);
                setSecondUser(fetchUser[0])
            }
        })();
    }, [selectedInbox, user])

    function handleChange(e) {
        setText(e);
    }

    async function handleClick(e) {

        if(text) {

            const message = {
                senderId: user,
                content: text,
                inboxId: selectedInbox._id
            }

            const newMessage = await messagesAPI.createMessage(message);
            const previousMessages = messages;
            setMessages([...messages, newMessage]);
            // console.log(messages);
            socket.emit('new-message', newMessage, secondUser, selectedInbox, previousMessages);
            setLastMessage(newMessage)
            setText('');
        }

    }


    function handleEnter() {
        handleClick();
    }

    return(
        <div className="middle-div">
            <div className="messages-list">
            {selectedInbox ?
                <div>
                    {messages.length ?
                    <MessageList messages={messages} user={user} selectedInbox={selectedInbox} secondUser={secondUser}/>
                    :
                    <h1>Type below to start chatting</h1>
                    }
                </div>
            :
            <>
                <h1>or a new user to chat with</h1>
                <h1>Select an existing chat</h1>
            </>
            }
            </div>
            {selectedInbox ?
                <div className="input-div">
                        <InputEmoji
                        onEnter={handleEnter}
                        className="input"
                        value={text}
                        onChange={handleChange}
                        />
                        <button onClick={handleClick} className="send-btn" type="submit">Send</button>
                </div>
            :
                <div></div>
            }

        </div>
    )
}
