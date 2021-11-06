import React from "react";
import iconFacebook from '../../images/icon-facebook.svg';
import iconInstagram from '../../images/icon-instagram.svg';
import iconTwitter from '../../images/icon-twitter.svg';
import iconPinterest from '../../images/icon-pinterest.svg';
import './footer.scss';

export const Footer = () => {

    return (
        <footer className='footer'>
            <div className='boostLinks'>
                <p>Boost your links today</p>
                <button>Get Started</button>
            </div>
            <div className='shortly'>
                <div><p>Shortly</p></div>
                <div>
                    <ul className='features'>
                        <li className='headerLi'>Features
                            <li>Link Shortening</li>
                            <li>Banded Links</li>
                            <li>Analytics</li>
                        </li>

                    </ul>
                </div>
                <div>
                    <ul className='resources'>
                        <li className='headerLi'>Resources
                            <li>Blog</li>
                            <li>Developers</li>
                            <li>Support</li>
                        </li>

                    </ul>
                </div>
                <div>
                    <ul className='company'>
                        <li className='headerLi'>Company
                            <li>About</li>
                            <li>Our Team</li>
                            <li>Careers</li>
                            <li>Contact</li>
                        </li>

                    </ul>
                </div>
                <div>
                    <i><a href="https://www.facebook.com" target="_blank"><img src={iconFacebook} alt="facebook" /></a></i>
                    <i><a href="https://www.twitter.com" target="_blank"><img src={iconTwitter} alt="twitter" /></a></i>
                    <i><a href="https://www.pinterest.com/" target="_blank"><img src={iconPinterest} alt="pinterest" /></a></i>
                    <i><a href="https://www.instagram.com" target="_blank"><img src={iconInstagram} alt="instagram" /></a></i>
                </div>
            </div>

        </footer>
    )
}