import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  styleUrl: './calculator-button.component.css',
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
})
export class CalculatorButtonComponent {
  public onClick = output<string>();

  public isPressed = signal(false);

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  /*@HostBinding('class.w-2/4') get
  commandStyle() {
    return this.isDoubleSize();
  }*/

  handleClick() {
    const value: string | null =
      this.contentValue()?.nativeElement.innerText ?? null;

    if (!value) {
      return;
    }

    this.onClick.emit(value.trim());
  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;
    const value: string = this.contentValue()?.nativeElement.innerText ?? '';
    if (value != key) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
