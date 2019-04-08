import React, { Component } from 'react';
import './App.css';
import CalculatorScreen from './CalculatorScreen';
import Button from './Button';

class App extends Component {
  constructor() {
    super();

    this.state = {
      mathToDo: [],
      displayMathCompleted: [],
      currentNumber: '',
      currentSymbol: ''
    }
  
    this.buttons = [
      { button: 'AC', class: 'mod-button' },
      { button: '+/-', class: 'mod-button' },
      { button: '%', class: 'mod-button' },
      { button: '/', class: 'symbol-button' },
      { button: '7', class: 'number-button' },
      { button: '8', class: 'number-button' },
      { button: '9', class: 'number-button' },
      { button: '*', class: 'symbol-button' },
      { button: '4', class: 'number-button' },
      { button: '5', class: 'number-button' },
      { button: '6', class: 'number-button' },
      { button: '-', class: 'symbol-button' },
      { button: '1', class: 'number-button' },
      { button: '2', class: 'number-button' },
      { button: '3', class: 'number-button' },
      { button: '+', class: 'symbol-button' },
      { button: '0', class: 'double number-button' },
      { button: '.', class: 'number-button' },
      { button: '=', class: 'symbol-button' }
    ]
  }

  formatNum = (total) => {
    const result = ((total - Math.floor(total)) === 0);
   
    if (result) return (total).toFixed(0); 

    return total;
  }
  
  keyGen = () => {
    return Date.now()
  }


  getButtonValue = (event) => {
    event.preventDefault();
    const currentValue = event.currentTarget.value;
    
    // If the button pressed is a number lets handle the logic here
    if (Number(currentValue) || Number(currentValue) === 0) {
      // If the current number is '' and we hit a 0 then it shouldn't append anymore numbers
      // However, if we hit any other number then it should append the numbers and the 0 shouldn't be displayed.
      // The 0 is set to the default in our cal screen js
      this.setState({
        currentNumber: ((this.state.currentNumber === '') && (Number(currentValue) === 0))
          ? ''
          : this.state.currentNumber + currentValue
      });
    } else {

      // we need to do math / convert a number / or clear / and =
      switch (currentValue) {
        case 'AC':
          // Clear our current number 
          // TODO
          // on second click if the current value is '', we need to clear the previous numbers typed array
          this.setState({
            mathToDo: [],
            displayMathCompleted: [],
            currentNumber: ''
          })
          break;
        case '+/-':
        // If the current state is positive Math.sign will give a positive number - should only run if we have a number
          this.state.currentNumber !== ''
            && this.setState({
                currentNumber: Math.sign(this.state.currentNumber) 
                  ? (this.state.currentNumber * -1) 
                  : Math.abs(this.state.currentNumber) 
              });
          break;
        case '%':
          // TODO 
          // If the user clicks the % button is should convert the number to a float
          // this.state.currentNumber !== ''
          //     &&
          break;
        case '/':
        case '*':
        case '-':
        case '+':
          this.state.currentNumber !== ''
            && this.setState({
              mathToDo: [
                ...this.state.mathToDo, 
                this.state.currentNumber, 
                currentValue
              ],
              displayMathCompleted: [
                ...this.state.displayMathCompleted,
                <span key={this.keyGen()}>{this.state.currentNumber}</span>, 
                <span key={this.keyGen() + currentValue}>{currentValue}</span>
              ],
              currentNumber: '',
              currentSymbol: currentValue
            })
          break;
        case '.':
          // TODO
          break;
        case '=':

          // EVAL is a risk in production code.. Using it here because it's quick and efficent
          const newNumber = Number(eval(this.state.mathToDo.join('') + this.state.currentNumber).toFixed(2));

          this.state.currentNumber !== ''
            && this.setState({
              mathToDo: [
                ...this.state.mathToDo, 
                this.state.currentNumber, 
                currentValue, 
                this.formatNum(newNumber)
              ],
              displayMathCompleted: [
                ...this.state.displayMathCompleted, 
                <span key={this.keyGen()}>{this.state.currentNumber}</span>, 
                <span key={this.keyGen() + currentValue}>{currentValue}</span>, 
                <span key={this.keyGen() + newNumber}>{this.formatNum(newNumber)}</span>
              ],
              currentNumber: this.formatNum(newNumber)
            })

          break;
        default:
          break;
      }
    }
  }

  generateButtons = () => {
    const buttonsArray = this.buttons.map((btn, index) => {
      return (
          <Button 
            key={index}
            styleClass={btn.class}
            value={btn.button}
            getValue={this.getButtonValue}
            buttonText={btn.button}
          />
      );
    });
    return buttonsArray;
  }

  render() {
    const { displayMathCompleted, currentNumber } = this.state;
    const buttons = this.generateButtons();

    return (
      <div className="App">
        <div className="calculator">
            <CalculatorScreen numbersArray={displayMathCompleted} currentTotal={currentNumber}/>
            {buttons}
        </div>
      </div>
    );
  }
}

export default App;
