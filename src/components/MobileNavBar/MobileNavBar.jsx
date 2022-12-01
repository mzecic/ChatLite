import './MobileNavBar.css';
import { useState } from 'react';
import { IoMenuOutline } from "react-icons/io5";
import ChatList from '../ChatList/ChatList';
import { Link } from 'react-router-dom';

export default function MobileNavBar({ navBar, setNavBar, handleLogOut, user }) {

    function handleToggle(e) {

        setNavBar(!navBar);
        console.log(e.target)
        console.log(navBar);
    }

    return(
        <>
        <nav className="mobile-nav">
            <button onClick={handleToggle}>{navBar ? <IoMenuOutline /> : <IoMenuOutline />}</button>

            <span><Link to="" onClick={handleLogOut}>Log Out</Link></span>
            {/* <div className={`nav-menu ${navBar ? 'show-menu' : ''}`}>
                Hello
            </div> */}
        </nav>
        <p className='mobile-nav-p'>Hello, {user.name}</p>
        </>
    )
}
