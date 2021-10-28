import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import { LoginContext } from '../context/contextStateLogin';
import { ShowLoggedShortUrl } from '../show-logged-short-url/ShowLoggedShortUrl';
import { ShowLogOutShortUrl } from '../show-log-out-short-url/ShowLogOutShortUrl';

const errorLabels = {
    'empty': 'Please add a link',
    'wrong': 'URL is incorrect'
}

const VALID_URL_REGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/


export const ShortUrl = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [shortUrls, setShortUrls] = useState([]);
    const inputRef = useRef(null)

    const { isLogin, isShowLoggedShortUrl, isShowLogOutShortUrl } = useContext(LoginContext);

    console.log('render')

    const handleClickButton = useCallback((e) => {
        e.preventDefault();
        const inputValue = inputRef.current.value
        const fetchURL = 'https://api.shrtco.de/v2/shorten?url=';
        if (inputValue === '') {
            setError('empty')
            return;
        };
        inputRef.current.value = ''
        if (VALID_URL_REGEXP.test(inputValue)) {
            const fullUrl = fetchURL + inputValue;
            setError(null)
            setIsLoading(true);
            fetch(fullUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        if (isLogin === false) {
                            setShortUrls(prevState => [...prevState, data.result]);
                        } else {
                            fetch('http://localhost:8000/shortUrl/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data.result),
                            })
                                .then(response => response.json())
                                .then(response => setShortUrls(prevState => [...prevState, data.result]))
                                .catch(error => console.error('Error -->', error))
                        }
                    }
                })
                .catch(error => {
                    console.log('Error --->', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });

        } else {
            setError('wrong')
        }
    }, []);

    useEffect(() => {
        if (isLogin) {
            fetch('http://localhost:8000/shortUrl/')
                .then(response => response.json())
                .then(data => {
                    setShortUrls(data);
                })
                .catch(error => {
                    console.log(error);
                });
                setShortUrls([]);
        }
    }, [isLogin]);

    return (
        <main className='main'>
            <div>
                <form>
                    <label htmlFor="urlValue" >Shorten Your link here...</label>
                    <input id='urlValue' ref={inputRef} type="text" placeholder='shorten your link' />
                    <button onClick={handleClickButton}>Shorten It!</button>
                </form>
                {error && <h1>{errorLabels[error]}</h1>}
            </div>
            {isShowLoggedShortUrl && <ShowLoggedShortUrl arrayLoggedShortUrl={shortUrls} />}
            {isShowLogOutShortUrl && <ShowLogOutShortUrl arrayLogOutShortUrl={shortUrls} />}
        </main>

    )
}
