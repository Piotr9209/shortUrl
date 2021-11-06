import React from "react";
import '../show-log-out-short-url/showShortUrl.scss';

export const ShowLoggedShortUrl = ({ arrayLoggedShortUrl }) => {

    return (<div className='showUrl'>
        {arrayLoggedShortUrl.map(url => {
            return (
                <div className='containerUrl' key={url.id}>
                    <p>{url.original_link}</p>
                    <p>{url.full_short_link}</p>
                    <button onClick={() => navigator.clipboard.writeText(url.full_short_link)}>COPY LINK</button>
                </div>
            )
        })}
    </div>)
}