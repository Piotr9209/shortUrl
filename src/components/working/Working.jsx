import React from 'react';
import ilustrationWorking from '../../images/illustration-working.svg';
import './working.scss';
export const Working = () => {

    return (
        <section className='section'>
            <div>
                <img src={ilustrationWorking} alt="ilustration working" />
            </div>
            <div>
                <h1>More than just shorter links</h1>
                <p>Build your brand's recognition and get detailed insights on how your links are performing.</p>
                <div><a href="#">Get Started</a></div>
            </div>
        </section>
    )
}