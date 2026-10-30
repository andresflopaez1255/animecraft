import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionTitle } from '../core/section-title/section-title';
import { PopularAnimesItem } from './popular-animes-item/popular-animes-item';
import { AnimePopularService } from './anime-popular.service';
import { PopularAnime } from '../core/interfaces/popular-anime';

@Component({
  imports: [SectionTitle, PopularAnimesItem, RouterLink],
  selector: 'app-popular-animes-list',
  templateUrl: './popular-animes-list.html',
})
export class PopularAnimesList implements OnInit {
  private readonly popularService = inject(AnimePopularService);

  readonly animesList = signal<PopularAnime[]>([]);

  ngOnInit(): void {
    this.getPopularAnimes();
  }

  getPopularAnimes(): void {
    this.popularService.getPopularList().subscribe({
      next: (response) => {
        if (response.data) {
          this.animesList.set(response.data);
        }
      },
      error: (err) => console.error('Error al cargar populares:', err),
    });
  }

  onWatchlistWheel(event: WheelEvent): void {
    const container = event.currentTarget as HTMLElement;
    if (event.deltaY === 0) return;
    event.preventDefault();
    container.scrollLeft += event.deltaY;
  }
}
