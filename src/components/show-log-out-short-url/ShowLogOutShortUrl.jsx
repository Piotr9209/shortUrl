import React from "react";

export const ShowLogOutShortUrl = ({ arrayLogOutShortUrl }) => {
    return (<div>
        {arrayLogOutShortUrl.map(url => {
            return (
                <div key={url.id}>
                    <p>{url.original_link}</p>
                    <p>{url.short_link}</p>
                    <button>COPY LINK</button>
                </div>
            )
        })}
    </div>)
}