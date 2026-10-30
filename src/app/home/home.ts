import { Component } from '@angular/core';
import Watchlist from '../watchlist/watchlist';
import { HeroBanner } from '../hero-banner/hero-banner';
import { PopularAnimesList } from '../popular-animes-list/popular-animes-list';
import { LastEpisodies } from '../last-episodies/last-episodies';
import { AnimeGenres } from '../anime-genres/anime-genres';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroBanner,
    Watchlist,
    PopularAnimesList,
    LastEpisodies,
    AnimeGenres,
  ],
  templateUrl: './home.html',
})
export class Home {}
