import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CALCULATOR';

  result: string = '';
  currentNumber: string = '';
  operator: string = '';
  clearOnNextInput: boolean = false;

  handleButtonPress(value: string) {
    if (value === 'AC') {
      this.clearAll();
    } else if (value === 'DEL') {
      this.delete();
    } else if (value === '=') {
      this.calculate();
    } else if (value === '%') {
      this.setOperator('%');
    } else if (
      value === '+' ||
      value === '-' ||
      value === '*' ||
      value === '/'
    ) {
      this.setOperator(value);
    } else {
      this.appendNumber(value);
    }
  }

  clearAll() {
    this.result = '';
    this.currentNumber = '';
    this.operator = '';
    this.clearOnNextInput = false;
  }

  delete() {
    this.currentNumber = this.currentNumber.slice(0, -1);
  }

  setOperator(operator: string) {
    if (this.currentNumber !== '') {
      this.operator = operator;
      this.result += this.currentNumber + ' ' + operator + ' ';
      this.currentNumber = '';
    }
  }
  appendNumber(num: string) {
    if (this.clearOnNextInput) {
      this.currentNumber = '';
      this.clearOnNextInput = false;
    }
    this.currentNumber += num;
  }

  calculate() {
    if (this.operator && this.currentNumber) {
      let result: number = 0;
      const num1 = parseFloat(this.result);
      const num2 = parseFloat(this.currentNumber);

      switch (this.operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          if (num2 === 0) {
            alert("Division by zero is not allowed!");
            this.result = 'Error';
            this.currentNumber = '';
            this.clearOnNextInput = true;
            return;
          } else {
            result = num1 / num2;
          }          break;
        case '%':
          result = num1 % num2;
          break;
        default:
          break;
      }

      this.result = result.toString();
      this.currentNumber = this.result;
      this.clearOnNextInput = true;
    }
  }
}
