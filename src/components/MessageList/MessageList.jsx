import MessageListItem from "../MessageListItem/MessageListItem";

export default function MessageList({ messages, user, secondUser }) {
    // console.log(messages)

    return(
        messages.map((message) => {
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
        })
    )
}
