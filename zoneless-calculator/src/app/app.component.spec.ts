import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should be 2', () => {
    const num1 = 1;
    const num2 = 2;
    const result = num1 + num2;
    expect(result).toEqual(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('router-outlet')?.textContent).not.toBeNull();
  });

  it("should contain the 'buy me a beer' link", () => {
    const anchorName = 'Buy me a beer';
    const anchorLink = 'https://www.buymeacoffee.com/scottwindon';
    expect(compiled.querySelector('a')).not.toBeNull();
    expect(compiled.querySelector('a')?.title).toEqual(anchorName);
    expect(compiled.querySelector('a')?.href).toEqual(anchorLink);
  });
});
