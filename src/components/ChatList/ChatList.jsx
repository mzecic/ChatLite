import './ChatList.css';
import ChatListItem from '../ChatListtem/ChatListItem';

export default function ChatList({ inboxes, user, handleInboxClick, handleRemoveInbox, lastMessage, setLastMessage, allMessages }) {




        const userInboxes = inboxes.map((inbox) => {
                const mess = lastMessage.inboxId === inbox._id ? lastMessage : null;

                return <ChatListItem
                mess={mess}
                allMessages={allMessages}
                lastMessage={lastMessage}
                setLastMessage={setLastMessage}
                inbox={inbox}
                user={user}
                key={inbox._id}
                handleInboxClick={handleInboxClick}
                handleRemoveInbox={handleRemoveInbox}
                />
            })

        return(
                <div className="left-div">
                {userInboxes}
                </div>
        )
}
