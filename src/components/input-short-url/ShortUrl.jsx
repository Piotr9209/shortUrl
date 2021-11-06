import React, { useState, useCallback, useEffect, useContext } from 'react';
import { LoginContext } from '../context/contextStateLogin';
import { ShowLoggedShortUrl } from '../show-logged-short-url/ShowLoggedShortUrl';
import { ShowLogOutShortUrl } from '../show-log-out-short-url/ShowLogOutShortUrl';

import './shortUrl.scss';

export const ShortUrl = () => {
    const [inputValue, setInputValue] = useState('');
    const [isEmptyUrl, setIsEmptyUrl] = useState(false);
    const [isWrongUrl, setIsWrongUrl] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [arrayLoggedShortUrl, setArrayLoggedShortUrl] = useState([]);
    const [arrayLogOutShortUrl, setArrayLogOutShortUrl] = useState([]);

    const { isLogin, isShowLoggedShortUrl, isShowLogOutShortUrl } = useContext(LoginContext);

    const handleChangeInput = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    };

    const messageValid = 'Please add a link';
    const messageWrongUrl = 'is wrong Url';

    const handleClickButton = useCallback((e) => {
        e.preventDefault();
        const validURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        const fetchURL = 'https://api.shrtco.de/v2/shorten?url=';
        if (inputValue === '') {
            setIsEmptyUrl(true);
            setIsWrongUrl(false);
            return;
        };

        if (validURL.test(inputValue)) {
            const fullUrl = fetchURL + inputValue;
            setIsEmptyUrl(false);
            setIsWrongUrl(false);
            setInputValue('');
            setIsLoading(true);
            fetch(fullUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        if (isLogin === false) {
                            setArrayLogOutShortUrl(prevState => [...prevState, data.result]);
                        } else {
                            fetch('http://localhost:8000/shortUrl/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data.result),
                            })
                                .then(response => response.json())
                                .then(response => setArrayLoggedShortUrl(prevState => [...prevState, data.result]))
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
            setIsEmptyUrl(false);
            setIsWrongUrl(true);
            setInputValue('');
        }
    }, [inputValue]);

    useEffect(() => {
        setInputValue(inputValue);
    }, [inputValue]);

    useEffect(() => {
        if (isLogin) {
            fetch('http://localhost:8000/shortUrl/')
                .then(response => response.json())
                .then(data => {
                    setArrayLoggedShortUrl(data);
                })
                .catch(error => {
                    console.log(error);
                });
            setArrayLogOutShortUrl([]);
        }
    }, [inputValue, isLogin]);

    return (
        <main className='main'>
            <div>
                <form>
                    <input id='urlValue' type="text" onChange={handleChangeInput} placeholder='shorten your link' value={inputValue} />
                    <div><button onClick={handleClickButton}>Shorten It!</button></div>
                    <div className='validMessage'>
                        {isEmptyUrl ? <p>{messageValid}</p> : null}
                        {isWrongUrl ? <p>{messageWrongUrl}</p> : null}
                    </div>
                </form>


            </div>
            {isShowLoggedShortUrl && <ShowLoggedShortUrl arrayLoggedShortUrl={arrayLoggedShortUrl} />}
            {isShowLogOutShortUrl && <ShowLogOutShortUrl arrayLogOutShortUrl={arrayLogOutShortUrl} />}
        </main>

    )
}