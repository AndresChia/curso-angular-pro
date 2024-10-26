import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorServices', () => {
  let service: CalculatorService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultTest()).toBe('0');
    expect(service.lastOperations()).toBe('+');
    expect(service.subResultTest()).toBe('0');
  });

  it('should set result text to "0" when c is pressed', () => {
    service.resultTest.set('0');
    service.lastOperations.set('+');
    service.subResultTest.set('0');
    service.constructorNumber('C');
    expect(service.resultTest()).toBe('0');
    expect(service.lastOperations()).toBe('+');
    expect(service.subResultTest()).toBe('0');
  });

  it('should update result text with number input', () => {
    service.constructorNumber('1');
    expect(service.resultTest()).toBe('1');

    service.constructorNumber('2');
    expect(service.resultTest()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructorNumber('1');
    service.constructorNumber('-');
    expect(service.lastOperations()).toBe('-');
    expect(service.subResultTest()).toBe('1');
    expect(service.resultTest()).toBe('0');
  });

  it('should calculate result correctly for adition', () => {
    service.constructorNumber('1');
    service.constructorNumber('+');
    service.constructorNumber('2');
    service.constructorNumber('=');
    expect(service.resultTest()).toBe('3');
  });

  it('should calculate result correctly for substraction', () => {
    service.constructorNumber('5');
    service.constructorNumber('-');
    service.constructorNumber('2');
    service.constructorNumber('=');
    expect(service.resultTest()).toBe('3');
  });

  it('should calculate result correctly for divide', () => {
    service.constructorNumber('1');
    service.constructorNumber('0');
    service.constructorNumber('÷');
    service.constructorNumber('2');
    service.constructorNumber('=');
    expect(service.resultTest()).toBe('5');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructorNumber('1');
    service.constructorNumber('0');
    service.constructorNumber('*');
    service.constructorNumber('2');
    service.constructorNumber('=');
    expect(service.resultTest()).toBe('20');
  });

  it('should handle decimal point correctly', () => {
    service.constructorNumber('1');
    service.constructorNumber('.');
    service.constructorNumber('5');
    expect(service.resultTest()).toBe('1.5');
    service.constructorNumber('.');
    expect(service.resultTest()).toBe('1.5');
  });

  it('should handle zero', () => {
    service.constructorNumber('0');
    service.constructorNumber('.');
    service.constructorNumber('0');
    expect(service.resultTest()).toBe('0.0');
  });

  it('should handle sign change correctly', () => {
    service.constructorNumber('1');
    service.constructorNumber('+/-');
    expect(service.resultTest()).toBe('-1');
    service.constructorNumber('+/-');
    expect(service.resultTest()).toBe('1');
  });

  it('should handle backspace correctly', () => {
    service.resultTest.set('123');
    service.constructorNumber('Backspace');
    expect(service.resultTest()).toBe('12');
  });
});
