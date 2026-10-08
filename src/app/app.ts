import { afterNextRender, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs';

import Navbar from './core/navbar/navbar';
import Watchlist from './watchlist/watchlist';
import { HeroBanner } from './hero-banner/hero-banner';
import { PopularAnimesList } from './popular-animes-list/popular-animes-list';
import { LastEpisodies } from './last-episodies/last-episodies';
import { AnimeGenres } from './anime-genres/anime-genres';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Watchlist, HeroBanner, PopularAnimesList, LastEpisodies, AnimeGenres],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Animecraft');

  private readonly router = inject(Router);

  constructor() {
    afterNextRender(() => initFlowbite());

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => initFlowbite());
  }
}
