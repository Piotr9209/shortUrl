import React from "react";


export const ShowLoggedShortUrl = ({ arrayLoggedShortUrl }) => {

    return (<div>
        {arrayLoggedShortUrl.map(url => {
            return (
                <div key={url.id}>
                    <p>{url.original_link}</p>
                    <p>{url.full_short_link}</p>
                    <button onClick={() => navigator.clipboard.writeText(url.full_short_link)}>COPY LINK</button>
                </div>
            )
        })}
    </div>)
}