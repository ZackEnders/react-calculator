import React from 'react';

const CalculatorScreen = ({numbersArray, currentTotal}) => {
    return (
        <div className="calc-screen">
            <div className="all-the-math">{numbersArray}</div>
            <div className="total">{currentTotal || 0}</div>
        </div>
    );
}

export default CalculatorScreen;