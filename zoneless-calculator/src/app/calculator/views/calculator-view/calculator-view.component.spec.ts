import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let app: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
