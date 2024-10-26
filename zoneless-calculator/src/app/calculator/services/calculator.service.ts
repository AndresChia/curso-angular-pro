import { Injectable, signal } from '@angular/core';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operators = ['+', '-', '*', '/', '÷', 'x'];
const specialsOperators = ['+/-', '%', '.', '=', 'C', '=', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultTest = signal('0');
  public subResultTest = signal('0');
  public lastOperations = signal('+');

  public constructorNumber(value: string) {
    if (![...numbers, ...operators, ...specialsOperators].includes(value)) {
      console.log('Invalid Input', value);
      return;
    }

    if (value === '=') {
      this.calculateResult();
    }

    if (value === 'C') {
      this.resultTest.set('0');
      this.subResultTest.set('0');
      this.lastOperations.set('+');
      return;
    }

    if (value === 'Backspace') {
      if (this.resultTest() === '0') return;
      if (this.resultTest().includes('-') && this.resultTest.length === 2) {
        this.resultTest.set('0');
        return;
      }
      if (this.resultTest().length === 1) {
        this.resultTest.set('0');
        return;
      }
      this.resultTest.update((v) => v.slice(0, -1));
      return;
    }

    if (operators.includes(value)) {
      //this.calculateResult();
      this.lastOperations.set(value);
      this.subResultTest.set(this.resultTest());
      this.resultTest.set('0');
      return;
    }

    if (this.resultTest.length > 10) {
      console.log('Max length reached');
    }

    if (value === '.' && !this.resultTest().includes('.')) {
      if (this.resultTest() === '0') {
        this.resultTest.set('0.');
        return;
      }
      this.resultTest.update((text) => text + '.');
      return;
    }

    if (
      value === '0' &&
      (this.resultTest() === '0' || this.resultTest() === '-0')
    ) {
      return;
    }

    if (value === '+/-') {
      if (this.resultTest().includes('-')) {
        this.resultTest.update((text) => text.slice(1));
        return;
      }
      this.resultTest.update((text) => '-' + text);
      return;
    }

    if (numbers.includes(value)) {
      if (this.resultTest() === '0') {
        this.resultTest.set(value);
        return;
      }

      if (this.resultTest() === '-0') {
        this.resultTest.set('-' + value);
        return;
      }

      this.resultTest.update((text) => text + value);
    }
  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultTest());
    const number2 = parseFloat(this.resultTest());

    let result = 0;

    switch (this.lastOperations()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '/':
      case '÷':
        result = number1 / number2;
        break;
      case '*':
      case 'x':
        result = number1 * number2;
        break;
      default:
        break;
    }

    this.resultTest.set(result.toString());
  }
}
