import { Injectable } from '@angular/core';

import { QuoteModel } from '../models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  public quoteList: QuoteModel[] = [];

  private daysOfTheWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];

  addNewQuote = (quote: string) => {
    const date = new Date();
    const dayOfTheWeek = this.daysOfTheWeeks[date.getDay()];
    const day = date.getDay();
    const year = date.getFullYear();

    this.quoteList.push(new QuoteModel(quote, `${dayOfTheWeek} ${day}, ${year}`));
  };

  getQuote = () => {
    return this.quoteList;
  };

  removeQuote = (index: number) => {
    this.quoteList.splice(index, 1);
  };

  fetchQuotesFromServer = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([new QuoteModel('I love unit testing', 'Mon 4, 2018')]);
      }, 2000);
    });
  }
}
