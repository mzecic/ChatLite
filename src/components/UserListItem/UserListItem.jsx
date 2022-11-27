import './UserListItem.css';

export default function UserListItem({ user }) {
    return(
        <div className="user-item">
           {user.name}
        </div>
    )
}
