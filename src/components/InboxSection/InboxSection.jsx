import { useEffect, useState, useRef } from 'react';
import '../InboxSection/InboxSection.css';
import * as inboxAPI from '../../utilities/inbox-api';
import * as messagesAPI from '../../utilities/messages-api';
import MessageList from '../MessageList/MessageList';
import InputEmoji from "react-input-emoji";
import { IoSendOutline } from 'react-icons/io5';
import socket from '../../utilities/socket';




export default function InboxSection({ selectedInbox, user, notifications, setNotifications }) {
    const [secondUser, setSecondUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(function() {

        (async function() {
            if (selectedInbox) {
                const inboxMessages = await messagesAPI.getMessages(selectedInbox._id)
                setMessages(inboxMessages);
                socket.emit('inbox', selectedInbox);
            }
        })();

        }, [selectedInbox])


    useEffect(function() {
        socket.on('receive-message', function(message, secondUser, selectedInbox) {
            if(message.inboxId === selectedInbox._id) {
                setMessages([...messages, message])
            }
        })
    }, [messages])

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
            socket.emit('send-message', newMessage, secondUser, selectedInbox)
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
                <h1>Select a chat</h1>
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
                        <button onClick={handleClick} type="submit"><IoSendOutline /></button>
                </div>
            :
                <div></div>
            }

        </div>
    )
}
