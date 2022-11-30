import { useEffect, useRef } from "react";
import MessageListItem from "../MessageListItem/MessageListItem";

export default function MessageList({ user, secondUser, selectedInbox }) {
    const scrollDown = useRef();

    useEffect(function() {
        scrollDown.current?.scrollTo({ block: "end", alignToTop: false, behavior: "smooth" })
    }, [selectedInbox.messages])

    return(
        <div ref={scrollDown}>
            {selectedInbox.messages.map((message) => {

                if(message.senderId === user._id) {
                    return <MessageListItem
                    message={message}
                    key={message._id}
                    user={user}
                    />
                } else if (message.senderId === secondUser._id) {
                    return <MessageListItem
                    message={message}
                    key={message._id}
                    secondUser={secondUser}
                    />
                }

            })}
        </div>
    )
}
