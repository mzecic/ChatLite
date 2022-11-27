import './UserListItem.css';

export default function UserListItem({ user, handleUserClick }) {
    return(
        <div onClick={handleUserClick} className="user-item" id={user._id}>
            <p className="user-item-content">{user.name}</p>
        </div>
    )
}
