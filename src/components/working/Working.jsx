import React from 'react';
import ilustrationWorking from '../../images/illustration-working.svg';

export const Working = () => {

    return (
        <section>
            <div>
                <h1>More than just shorter links</h1>
                <p>Build your brand's recognition and get detailed insights on how your links are performing.</p>
                <a href="#">Get Started</a>
            </div>
            <div>
                <img src={ilustrationWorking} alt="ilustration working" />
            </div>
        </section>
    )
}