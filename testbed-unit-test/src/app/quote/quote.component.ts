import {Component, OnInit} from "@angular/core";
import {QuoteService} from '../../services/quote.service';
import {QuoteModel} from '../../models/quote.model';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit{
  public quoteList: QuoteModel[];
  public fetchedList: QuoteModel[];
  public quoteText: string = null;

  constructor(private service: QuoteService) {}

  ngOnInit(): void {
    console.log('[QuoteComponent] ngOnInit');

    this.quoteList = this.service.getQuote();
    this.service.fetchQuotesFromServer().then((data: QuoteModel[]) => {
      this.fetchedList = data;
    })
  }

  createNewQuote = () => {
    this.service.addNewQuote(this.quoteText);
    this.quoteText = null;
  }

  removeQuote = (index: number) => {
    this.service.removeQuote(index);
  }
}
