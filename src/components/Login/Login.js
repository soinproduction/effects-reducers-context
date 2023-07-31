import React, {useState, useEffect, useReducer, useContext, useRef} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import authContext from "../../store/auth-context";

import {emailData,passwordData} from "../../utils/inputData";
import {Input} from "../UI/input/Input";

const  emailReduser = (prevState,action) => {
    if (action.type === "USER_INPUT") {
        return {
            value: action.value,
            isValid: action.value.includes('@'),
        }
    }

    if ((action.type === "INPUT_BLUR")) {
        return {
            value: prevState.value,
            isValid: prevState.value.includes('@'),
        }
    }

    return {
        value: '',
        isValid: false,
    }


};

const passReduser = (prevState, action) => {
    if (action.type === "INPUT_PASSWORD") {
        return {
            value: action.value,
            isValid: action.value.trim().length > 7,
        }   
    }

    if ((action.type === "INPUT_BLUR")) {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 7,
        }
    }

    return {
        value: '',
        isValid: false,
    }
}

const Login = () => {
    const [formIsValid, setFormIsValid] = useState(false);
    
    const [emailState, dispatchEmailState] = useReducer(emailReduser, {
        value: '',
        isValid: undefined,
    });

    const [passState, dispatchPassState] = useReducer(passReduser, {
        value: '',
        isValid: undefined
    })

    const {isValid: emailIsValid } = emailState;
    const {isValid: passIsValid} = passState;

    const {onLogin} = useContext(authContext);


    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    useEffect(()=>{
        const timer = setTimeout(() =>{
            setFormIsValid(
                emailIsValid && passIsValid
            )
        },1000);

        return () => {
            clearInterval(timer);
        }

    },[emailIsValid, passIsValid])


    const emailChangeHandler = (event) => {
        dispatchEmailState({
            type: 'USER_INPUT',
            value: event.target.value,
        })
    };

    const passwordChangeHandler = (event) => {
        dispatchPassState({
            type: "INPUT_PASSWORD",
            isValid: event.target.value.trim().length > 7,
            value: event.target.value,
        });
    };

    const validateEmailHandler = () => {
        dispatchPassState({type: 'INPUT_BLUR'})
    };

    const validatePasswordHandler = (e) => {
        dispatchPassState({type: 'INPUT_BLUR'})
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            onLogin(emailState.value, passState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (<Card className={styles.login}>
            <form onSubmit={submitHandler}>

                <Input
                    ref={emailInputRef}
                    inputData={emailData}
                    state={emailState}
                    onChangeHandler={emailChangeHandler}
                    onValidateHandler={validateEmailHandler}
                />

                <Input
                    ref={passwordInputRef}
                    inputData={passwordData}
                    state={passState}
                    onChangeHandler={passwordChangeHandler}
                    onValidateHandler={validatePasswordHandler}
                />

                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn} disabled={!passState.isValid}>
                        Вход
                    </Button>
                </div>
            </form>
        </Card>);
};

export default Login;
