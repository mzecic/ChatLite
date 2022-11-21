import { useEffect, useState, useRef } from 'react';
import '../InboxSection/InboxSection.css';
import * as inboxAPI from '../../utilities/inbox-api';
import * as messagesAPI from '../../utilities/messages-api';
import MessageList from '../MessageList/MessageList';
import InputEmoji from "react-input-emoji";
import { IoSendOutline } from 'react-icons/io5';




export default function InboxSection({ selectedInbox, user, setMessageForSocket, messageFromSocket }) {
    const [secondUser, setSecondUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(function() {
        if(messageFromSocket !== null && messageFromSocket.inboxId === selectedInbox._id){
            setMessages([...messages, messageFromSocket])
        }
        console.log(messageFromSocket)
    }, [messageFromSocket])


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


    function handleChange(e) {
        setText(e);
    }

    async function handleClick(e) {
        e.preventDefault();
        const message = {
            senderId: user,
            content: text,
            inboxId: selectedInbox._id
        }

        const result = await messagesAPI.createMessage(message);
        setMessages([...messages, result]);
        setText('');

        const receiverId = selectedInbox.users.find(id => id !== user._id);
        setMessageForSocket({...message, receiverId});
    }


    return(
        <div className="middle-div">
            <div className="messages-list">
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
            <div className="input-div">
                <InputEmoji
                value={text}
                onChange={handleChange}
                />
                <button onClick={handleClick}type="submit"><IoSendOutline /></button>
            </div>
        </div>
    )
}
