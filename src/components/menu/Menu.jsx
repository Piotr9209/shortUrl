import React, { useContext } from 'react';
import { LoginContext } from '../context/contextStateLogin';

import './menu.scss'
export const Menu = () => {
    const { isLogin, toggleLogin } = useContext(LoginContext);


    const handleClickLogin = () => {
        toggleLogin();
    };
    return (

        <nav className='nav'>
            <a href="#shortly" className='logo'>Shortly</a>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
            <ul className='menu'>
                <li><a href="#Features">Features</a></li>
                <li><a href="#Pricing">Pricing</a></li>
                <li><a href="#Resources">Resources</a></li>
                <li>
                    <a onClick={handleClickLogin}>{isLogin ? 'log out' : 'log in'}</a></li>
            </ul>
        </nav>
    )
}