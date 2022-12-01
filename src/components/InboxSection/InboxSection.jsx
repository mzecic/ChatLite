import { useEffect, useState, useRef } from 'react';
import '../InboxSection/InboxSection.css';
import * as inboxAPI from '../../utilities/inbox-api';
import * as messagesAPI from '../../utilities/messages-api';
import MessageList from '../MessageList/MessageList';
import InputEmoji from "react-input-emoji";
import { IoSendOutline, IoChevronForwardSharp } from 'react-icons/io5';
import socket from '../../utilities/socket';
import { set } from 'mongoose';




export default function InboxSection({ setSelectedInbox, selectedInbox, user, notifications, setNotifications, messages, setMessages, lastMessage, setLastMessage, typing, setTyping, isTyping, setIsTyping, socketConnected }) {
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
        setTyping(false);
        if(!socketConnected) return

        if(!typing) {
            socket.emit('typing', selectedInbox, user);
            setTyping(true);
        }
        setTimeout(function() {
                socket.emit('typing-stopped', selectedInbox, user);
                setTyping(false);
        }, 2000);
    }

    async function handleClick(e) {


        if(text) {

            const message = {
                senderId: user,
                content: text,
            }

            const updatedInbox = await messagesAPI.createMessage(message, selectedInbox);
            setSelectedInbox(updatedInbox);
            if(updatedInbox.messages.length > 50) {
                updatedInbox.messages.splice(0, 50);
            }
            socket.emit('new-message', updatedInbox);
            socket.emit('typing-stopped', selectedInbox._id);
            setLastMessage(updatedInbox.messages[updatedInbox.messages.length - 1]);
            setText('');
            document.querySelector('.messages-list').lastChild.scrollIntoView(false)
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
                    {selectedInbox.messages.length ?
                    <MessageList user={user} selectedInbox={selectedInbox} secondUser={secondUser}/>
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
                        {isTyping ?
                        <div>Loading...</div>
                        :
                        <></>
                        }
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
