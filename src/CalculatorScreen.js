import React from 'react';

const CalculatorScreen = (props) => {
    return (
        <div className="calc-screen">
            <div className="all-the-math">{props.numbersArray}</div>
            <div className="total">{props.current || 0}</div>
        </div>
    );
}

export default CalculatorScreen;