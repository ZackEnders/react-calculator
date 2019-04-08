import React from 'react';

const Button = (props) => {
    const { styleClass, value, getValue, buttonText } = props;

    return <button className={styleClass} value={value} onClick={getValue}>{buttonText}</button>;
}

export default Button;