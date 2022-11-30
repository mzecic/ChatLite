import './MobileNavBar.css';
import { useState } from 'react';
import { IoMenuOutline } from "react-icons/io5";
import ChatList from '../ChatList/ChatList';

export default function MobileNavBar({ navBar, setNavBar }) {

    function handleToggle(e) {

        setNavBar(!navBar);
        console.log(e.target)
        console.log(navBar);
    }

    return(
        <nav className="mobile-nav">
            <button onClick={handleToggle}>{navBar ? <IoMenuOutline /> : <IoMenuOutline />}</button>
            {/* <div className={`nav-menu ${navBar ? 'show-menu' : ''}`}>
                Hello
            </div> */}
        </nav>
    )
}
