import './ChatList.css';
import ChatListItem from '../ChatListtem/ChatListItem';
import MediaQuery from 'react-responsive';

export default function ChatList({ inboxes, user, handleInboxClick, handleRemoveInbox, lastMessage, setLastMessage, allMessages, navBar, setNavBar }) {

        // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' })


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
                <>
                        <MediaQuery maxWidth={1200}>
                                <ul className={`${!navBar ? 'chat-list-mobile' : 'chat-list-mobile-hidden'}`}>{userInboxes}</ul>
                        </MediaQuery>
                        <div className="left-div">
                                {userInboxes}
                        </div>
                </>
        )
}
