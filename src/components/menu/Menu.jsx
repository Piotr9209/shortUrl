import React, { useContext } from 'react';
import { LoginContext } from '../context/contextStateLogin';


export const Menu = () => {
    const { isLogin, toggleLogin } = useContext(LoginContext);


    const handleClickLogin = () => {
        toggleLogin();
    };
    return (
        <nav>
            <div>
                <p>Shortly</p>
            </div>
            <div>
                <ul>
                    <li>Features</li>
                    <li>Pricing</li>
                    <li>Resources</li>
                </ul>
            </div>
            <div>
                <button onClick={handleClickLogin}>{isLogin ? 'log out' : 'log in'}</button>
            </div>
        </nav>
    )
}