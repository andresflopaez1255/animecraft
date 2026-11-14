import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IWatchlistItem } from '../watchlist';

@Component({
  selector: 'app-watchlist-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './watchlist-item.html',
  styleUrl: './watchlist-item.css',
})
export default class WatchlistItem {
  @Input({ required: true }) watchlistItem!: IWatchlistItem;
}
