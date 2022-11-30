import './MobileNavBar.css';
import { useState } from 'react';
import { IoMenuOutline } from "react-icons/io5";
import ChatList from '../ChatList/ChatList';

export default function MobileNavBar() {
    const [navBar, setNavBar] = useState(false);

    function handleToggle() {
        setNavBar(!navBar);
    }

    return(
        <nav className="mobile-nav">
            <button onClick={handleToggle}>{navBar ? <IoMenuOutline /> : <IoMenuOutline />}</button>
            <ul className={`nav-menu ${navBar ? 'show-menu' : ''}`}>
                ...
            </ul>
        </nav>
    )
}
