import { QuoteService } from './quote.service';
import { QuoteModel } from '../models/quote.model';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(() => {
    service = new QuoteService();
  });

  it('should create a post in an array', () => {
    const quoteText = 'This is my first post';
    service.addNewQuote(quoteText);
    expect(service.quoteList.length).toBeGreaterThanOrEqual(1);
  });

  it('should remove a created post from the array of posts', () => {
    service.addNewQuote("This is my first post");
    service.removeQuote(0);
    expect(service.quoteList.length).toBeLessThan(1);
  });

  it('should fetch data async', async () => {
    const fakeFetchedList = [
      new QuoteModel('I love unit testing', 'Mon 4, 2018'),
    ];

    spyOn(service, 'fetchQuotesFromServer').and.returnValue(Promise.resolve(fakeFetchedList));

    const res = await service.fetchQuotesFromServer();
    expect(res).toEqual(fakeFetchedList);
  });
});
