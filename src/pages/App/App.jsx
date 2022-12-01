import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar'
import MobileNavBar from '../../components/MobileNavBar/MobileNavBar';
import InboxPage from '../InboxPage/InboxPage'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import * as userService from '../../utilities/users-service'

export default function App() {
  const [user, setUser] = useState(getUser());
  const [navBar, setNavBar] = useState(false);

  function handleLogOut() {
    userService.logOut()
    setUser(null)
}

  return (
    <main className="App">
      { user ?
        <>
          <NavBar handleLogOut={handleLogOut} user={user} setUser={setUser} />
          <MobileNavBar handleLogOut={handleLogOut} user={user} navBar={navBar} setNavBar={setNavBar} />
          <InboxPage user={user} navBar={navBar} setNavBar={setNavBar} />
          <Routes>
            {/* <Route path="/signup" element={<SignUpForm />} /> */}
            {/* <Route path="/inbox" element={<InboxPage user={user}/>}/> */}
          </Routes>
        </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
