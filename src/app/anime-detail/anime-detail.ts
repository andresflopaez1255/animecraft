import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClient } from '../core/config/api-client';
import { ApiResponse } from '../core/interfaces/api-response';
import { Anime } from '../core/interfaces/anim.interfaces';
import { AnimeBanner } from './anime-banner/anime-banner';

@Component({
  imports: [RouterLink, AnimeBanner],
  selector: 'app-anime-detail',
  styleUrl: './anime-detail.css',
  templateUrl: './anime-detail.html',
})
export class AnimeDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiClient);

  readonly animeId = signal<string | null>(null);
  readonly anime = signal<Anime | null>(null);
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const id =
      this.route.snapshot.paramMap.get('id') ||
      this.route.snapshot.queryParamMap.get('id');
    this.animeId.set(id);

    if (id) {
      this.api.get<ApiResponse<Anime>>(`/anime/${id}`).subscribe({
        next: (res) => {
          if (res.data) {
            this.anime.set(res.data);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error cargando detalle:', err);
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }
}
