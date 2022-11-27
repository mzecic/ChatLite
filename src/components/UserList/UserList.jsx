import './UserList.css';
import UserListItem from '../UserListItem/UserListItem';

export default function UserList({ onlineUsers, handleUserClick, currentUser }) {

    const onlineUsersRender = onlineUsers.map(user => {
        if(user._id === currentUser._id) return;
        return <UserListItem user={user} key={user._id} handleUserClick={handleUserClick}/>

    })

    return(
        <div className="right-div">
            {onlineUsersRender}
        </div>
    )
}
