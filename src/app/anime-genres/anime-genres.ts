import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionTitle } from '../core/section-title/section-title';
import { AnimeGenresService } from './anime-genres.service';
import { GenreCategory } from '../core/interfaces/category.interface';

@Component({
  imports: [],
  selector: 'app-anime-genres',
  styleUrl: './anime-genres.css',
  templateUrl: './anime-genres.html',
})
export class AnimeGenres implements OnInit {
  private readonly genresService = inject(AnimeGenresService);

  readonly genres = signal<GenreCategory[]>([]);
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.genresService.getCategories().subscribe({
      next: (response) => {
        if (response.data) {
          this.genres.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar las categorías:', error);
        this.isLoading.set(false);
      },
    });
  }
}
