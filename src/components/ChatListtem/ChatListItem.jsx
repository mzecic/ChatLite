import './ChatListItem.css';
import * as inboxAPI from '../../utilities/inbox-api';
import * as messagesAPI from '../../utilities/messages-api';
import { useState, useEffect, useRef } from 'react';


export default function ChatListItem({ inbox, user, handleInboxClick, handleRemoveInbox, lastMessage, setLastMessage, messages, mess }, ref) {
    const [secondUser, setSecondUser] = useState({});
    const [inMessages, setInMessages] = useState([]);
    const [message, setMessage] = useState(null);
    // const [messages] = useRef();

    const inboxMessages = messages.filter(message => message.inboxId === inbox._id);

    useEffect(function() {
        (async function(){
            // const messages = await messagesAPI.getMessages(inbox._id);
            // setInboxMessages(messages);
            setInMessages(inboxMessages);
            console.log(inMessages);
            console.log(lastMessage)
            console.log(inboxMessages);
            console.log(mess)
            if(lastMessage.inboxId === inbox._id) {
                setMessage(lastMessage)
                console.log(lastMessage);
            }

            // setLastMessage(messages[messages.length - 1])
        })();
    }, [lastMessage]);

    useEffect(function() {
        (async function() {
                const secondUserId = inbox.users.find(userId => userId !== user._id);
                const fetchUser = await inboxAPI.getSecondUser(secondUserId);
                setSecondUser(fetchUser[0])
        })();
}, [inMessages])

    function handleMouseEnter(e) {
       e.target.children[1].classList.remove('hidden')
    }

    function handleMouseLeave(e) {
        e.target.children[1].classList.add('hidden')
    }

    return(
        <div onMouseLeave={(e => handleMouseLeave(e))} onMouseEnter={(e) => handleMouseEnter(e)} onClick={(e) => handleInboxClick(e, inbox)} className="chat-item">
            <span className="chat-item-content">{secondUser.name}</span><button onClick={(e) => handleRemoveInbox(e)} className={ `hidden ${inbox._id}`} id="delete-chat" type="submit">X</button>
            {message ?
            <>
                {message.inboxId === inbox._id ?
                <span>{message.content}</span>
            :
                <span>{inMessages[inMessages.length - 1]}</span>
            }
            </>
        :
            <span></span>
        }

            {/* {inboxMessages[inboxMessages.length - 1].content ?
            <span>{inboxMessages[inboxMessages.length - 1].content}</span>
            :
            <span></span>
            } */}

            {/* {inboxMessages[inboxMessages.length - 1] ?
            <>
            {inboxMessages[inboxMessages.length - 1].inboxId === inbox._id ?
                <>
                    {inboxMessages[inboxMessages.length - 1].senderId === user._id ?
                        <span className="last-message">You: {inboxMessages[inboxMessages.length - 1].content.slice(0, 11)}...</span>
                    :
                        <>
                            {inboxMessages[inboxMessages.length - 1].senderId === secondUser._id ?
                            <span className="last-message">{secondUser.name}: {inboxMessages[inboxMessages.length - 1].content.slice(0, 11)}...</span>
                            :
                            <span></span>
                            }
                        </>
                    }
                </>
            :
                <span></span>
            }
             </>
            :
                <p></p>
        } */}
        </div>
    )
}
