import './UserList.css';
import UserListItem from '../UserListItem/UserListItem';
import MediaQuery from 'react-responsive';

export default function UserList({ onlineUsers, handleUserClick, currentUser, navBar, setNavBar }) {

    const onlineUsersRender = onlineUsers.map(user => {
        if(user._id === currentUser._id) return;
        return <UserListItem user={user} key={user._id} handleUserClick={handleUserClick}/>

    })

    return(
        <>
            <MediaQuery maxWidth={1200}>
                <ul className={`${!navBar ? 'user-list-mobile' : 'user-list-mobile-hidden'}`}>{onlineUsersRender}</ul>
            </MediaQuery>
            <div className="right-div">
                {onlineUsersRender}
            </div>
        </>
    )
}
