import { useEffect, useRef } from "react";
import MessageListItem from "../MessageListItem/MessageListItem";

export default function MessageList({ messages, user, secondUser }) {
    const scrollDown = useRef();

    useEffect(function() {
        scrollDown.current?.scrollTo({ block: "end", alignToTop: false, behavior: "smooth" })
    }, [messages])

    return(
        <div ref={scrollDown}>
            {messages.map((message) => {

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
