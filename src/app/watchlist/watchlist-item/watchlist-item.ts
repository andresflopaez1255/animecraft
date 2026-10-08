import { Component, Input } from '@angular/core';
import { IWatchlistItem, WATCHLIST_MOCK } from '../watchlist';



@Component({
  imports: [

  ],
  selector: 'app-watchlist-item',
  styleUrl: './watchlist-item.css',
  templateUrl: './watchlist-item.html',
})

export default class WatchlistItem {
  @Input() watchlistItem: IWatchlistItem = WATCHLIST_MOCK[0];

  constructor() {
    this.watchlistItem = WATCHLIST_MOCK[0] as IWatchlistItem;
  }
}
