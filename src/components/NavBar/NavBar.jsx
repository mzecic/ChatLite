import './NavBar.css';
import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav>
            <span>Welcome, {user.name}</span>
            <Link to="" onClick={handleLogOut}><button>Log Out</button></Link>
        </nav>
    )
}
