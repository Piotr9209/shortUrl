import React, { useState, useCallback, useEffect, useContext } from 'react';
import { LoginContext } from '../context/contextStateLogin';
import { ShowLoggedShortUrl } from '../show-logged-short-url/ShowLoggedShortUrl';
import { ShowLogOutShortUrl } from '../show-log-out-short-url/ShowLogOutShortUrl';


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
                                .catch(error => console.error('Error:', error))
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
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
                })
        }
    }, [inputValue, isLogin]);
    //ustawiam tablicę którą przekazuje do komponentu: ShowLoggedShortUrl - w JSONie tablica się zapisuje

    return (
        <main>
            <div>
                <form>
                    <label htmlFor="urlValue" >Shorten Your link here...</label>
                    <input id='urlValue' type="text" onChange={handleChangeInput} placeholder='shorten your link' value={inputValue} />
                    <button onClick={handleClickButton}>Shorten It!</button>
                </form>
                <h1>{isEmptyUrl ? messageValid : null}</h1>
                <h1>{isWrongUrl ? messageWrongUrl : null}</h1>
            </div>
            {isShowLoggedShortUrl && <ShowLoggedShortUrl arrayLoggedShortUrl={arrayLoggedShortUrl} />}
            {isShowLogOutShortUrl && <ShowLogOutShortUrl arrayLogOutShortUrl={arrayLogOutShortUrl} />}
        </main>

    )
}