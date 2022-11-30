import './MobileNavBar.css';
import { useState } from 'react';

export default function MobileNavBar() {
    const [navBar, setNavBar] = useState(false);

    return(
        <nav className="mobile-nav">
            <button>{navBar ? "Close" : "Open"}</button>
            <ul>...</ul>
        </nav>
    )
}
