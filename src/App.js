import React, {useState, useEffect, useContext} from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <React.Fragment>
            <MainHeader/>
            <main>
                {!isLoggedIn && <Login/>}
                {isLoggedIn && <Home/>}
            </main>
        </React.Fragment>
    );
}

export default App;
