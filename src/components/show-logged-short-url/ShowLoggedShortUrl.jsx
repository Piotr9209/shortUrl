import React from "react";


export const ShowLoggedShortUrl = ({ arrayLoggedShortUrl }) => {
    //przechwytuje tablicę i po dodaniu kolejnego url by go skrócić nie widzi mi go na bieżąco tylko po aktualizacji stanu (button: log in/log out)
    return (<div>
        {arrayLoggedShortUrl.map(url => {
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