import React from "react";
import './showShortUrl.scss';


export const ShowLogOutShortUrl = ({ arrayLogOutShortUrl }) => {
    return (<div className='showUrl'>
        {arrayLogOutShortUrl.map(url => {
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