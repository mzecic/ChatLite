import './UserListItem.css';

export default function UserListItem({ user, handleUserClick }) {
    return(
        <div onClick={(e) => handleUserClick(e)} className={` ${user._id} user-item`} >
            <p className="user-item-content">{user.name}</p>
        </div>
    )
}
