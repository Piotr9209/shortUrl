import React, { createContext, useState } from "react";

const LoginContext = createContext();

function LoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [isShowLoggedShortUrl, setIsShowLoggedShortUrl] = useState(false);
    const [isShowLogOutShortUrl, setIsShowLogOutShortUrl] = useState(true);

    function toggleLogin() {
        setIsLogin(prevState => !prevState);
        setIsShowLoggedShortUrl(prevState => !prevState);
        setIsShowLogOutShortUrl(prevState => !prevState);
    }

    const value = {
        isLogin,
        isShowLoggedShortUrl,
        isShowLogOutShortUrl,
        toggleLogin
    }

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};

const useLoginContext = () => LoginContext()

export { LoginContext, LoginProvider, useLoginContext };

