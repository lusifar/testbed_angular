import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { QuoteComponent } from './quote.component';
import { QuoteService } from '../../services/quote.service';
import { QuoteModel } from "../../models/quote.model";

describe('QuoteComponent', () => {
  let quoteComponent: QuoteComponent = null;
  let fixture: ComponentFixture<QuoteComponent> = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [QuoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteComponent);
    quoteComponent = fixture.componentInstance;
  })

  it('should create QuoteComponent', () => {
    expect(quoteComponent).toBeTruthy();
  });

  it('should use the quoteList from the service', () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    fixture.detectChanges();
    expect(quoteService.getQuote()).toEqual
  });

  it('should create a new post', () => {
    // quoteComponent.quoteText = 'I love this test';
    // fixture.detectChanges();
    //   console.log('QQQQQ');
    //   const compiled = fixture.debugElement.query(By.css('textarea'));

    // console.log(compiled.nativeElement.value);

    // expect(textareaEle).toContain('I love this test');
  });

  it('it should disable the button when textarea is empty', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('it should enable the button when textarea us not empty', () => {
    quoteComponent.quoteText = 'I love this test';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('it should contain post upon button clicked', () => {
    quoteComponent.quoteText = 'This is a fresh post';

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('This is a fresh post');
  });

  it('it should fetch data async', () => {
    const fakeFetchedList = [
      new QuoteModel("I love unit testing", "Mon 4, 2018"),
    ];

    const quoteService = fixture.debugElement.injector.get(QuoteService);
    let spy = spyOn(quoteService, 'fetchQuotesFromServer').and.returnValue(Promise.resolve(fakeFetchedList));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(quoteComponent.fetchedList).toBe(fakeFetchedList);
    })
  });
});
