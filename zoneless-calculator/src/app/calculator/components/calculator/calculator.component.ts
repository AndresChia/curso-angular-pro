import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  styleUrl: './calculator.component.css',
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);

  /*get resultText() {
    return this.calculatorService.resultTest;
  }*/
  public resultText = computed(() => this.calculatorService.resultTest());
  public subResultTest = computed(() => this.calculatorService.subResultTest());
  public lastOperations = computed(() =>
    this.calculatorService.lastOperations()
  );

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handledClick(key: string) {
    console.log({ key });
    this.calculatorService.constructorNumber(key);
  }

  //@HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
      ' ': '=',
    };

    const valueKey = event.key.toLowerCase();
    const key: string = keyEquivalents[valueKey] ?? valueKey;
    this.handledClick(key);
    this.calculatorButtons().forEach((element) => {
      element.keyboardPressedStyle(key);
    });
  }
}
