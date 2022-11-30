import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AuthPage({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);

    function handleButtonClick(e) {
        setIsLogin(!isLogin);
    };

    return (
        <main>
            {isLogin ?
                <LoginForm setUser={setUser} />
            :
                <SignUpForm setUser={setUser} />
            }
            {isLogin ?
                <div className="login-signup">
                    <span>Don't have an account?</span>
                    <button className="switch-btn" onClick={handleButtonClick}>
                        <span>Sign Up</span>
                    </button>
                </div>
                :
                <div className="login-signup">
                    <span>Already have an account?</span>
                    <button className="switch-btn" onClick={handleButtonClick}>
                        <span>Log In</span>
                    </button>
                </div>
            }
        </main>
    )
}
