import styles from "../../Login/Login.module.css";
import React, {useRef, useImperativeHandle } from "react";

export const Input = React.forwardRef(({ onChangeHandler, onValidateHandler, state, inputData, }, ref) => {
    const inputRef = useRef();

    const activateInput = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref,()=>{
        return {
            focus: activateInput
        };
    });

    return (
        <div className={`${styles.control} ${state.isValid === false ? styles.invalid : ""}`}>
            <label htmlFor={inputData.type}>{inputData.text}</label>
            <input
                ref={inputRef}
                type={inputData.type}
                id={inputData.id}
                value={state.value}
                onChange={onChangeHandler}
                onBlur={onValidateHandler}
            />
        </div>
    );
})
