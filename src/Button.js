import React from 'react';

const Button = (props) => {
    return <button className={props.styleClass} value={props.value} onClick={props.getValue}>{props.buttonText}</button>;
}

export default Button;