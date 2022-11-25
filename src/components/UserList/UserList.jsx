import './UserList.css';
import UserListItem from '../UserListItem/UserListItem';

export default function UserList({ onlineUsers }) {

    const onlineUsersRender = onlineUsers.map(user => {

        return <UserListItem user={user} key={user._id}/>

    })

    return(
        <div>
            <h2>{onlineUsersRender}</h2>
            <h1>hello</h1>
        </div>
    )
}
