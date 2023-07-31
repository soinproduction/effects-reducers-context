import React, {useEffect, useState} from "react";


const AuthContext = React.createContext({
    isLoggedIn: true,
    onLogout: () => {
    },
    onLogin: (email, password) => {
    },
});


export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const storedLoginInfo = localStorage.getItem('isLoggedIn');

        if (storedLoginInfo === '1') {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);


    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }



    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;