import React , {useContext} from "react";

import {nav} from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = () => {

    const {isLoggedIn, onLogout} = useContext(AuthContext);

    return (
        <nav className={nav}>
            <ul>
                {isLoggedIn && (
                    <li>
                        <a href="/">Пользователи</a>
                    </li>
                )}
                {isLoggedIn && (
                    <li>
                        <a href="/">Админ</a>
                    </li>
                )}
                {isLoggedIn && (
                    <li>
                        <button onClick={onLogout}>Выйти</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
