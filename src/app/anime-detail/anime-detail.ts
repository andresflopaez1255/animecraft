import { Subscription } from 'rxjs';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Anime } from '../core/interfaces/anim.interfaces';
import { AnimeEpisodesAndSeasonsResponse, AnimeSeason } from '../core/interfaces/anime-detail.interfaces';
import { AnimeBanner } from './anime-banner/anime-banner';
import { AnimeDetailService } from './anime-detail.service';

@Component({
  imports: [RouterLink, AnimeBanner],
  selector: 'app-anime-detail',
  styleUrl: './anime-detail.css',
  templateUrl: './anime-detail.html',
})
export class AnimeDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly animeDetailService = inject(AnimeDetailService);
  readonly animeId = signal<string | null>(null);
  readonly anime = signal<Anime | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly showFullDescription = signal<boolean>(false);
  readonly toggleDropdownSeasonsSignal = signal<boolean>(false);
  readonly animeEpisodes = signal<AnimeEpisodesAndSeasonsResponse | null>(null);
  readonly selectedSeasonID = signal<string>("");
  readonly episodesError = signal<string | null>(null);
  readonly episodesLoading = signal(false);
  private episodesRequest?: Subscription;


  ngOnInit(): void {
    const id =
      this.route.snapshot.paramMap.get('id') ||
      this.route.snapshot.queryParamMap.get('id');
      
    this.animeId.set(id);

    if (id) {
      this.getAnimeDetail(id);
      this.getAnimeEpisodes(id);
    } else {
      this.isLoading.set(false);
    }

     

  }

  getAnimeDetail(id: string) {
    this.animeDetailService.getAnimeDetail(id).subscribe({
      next: (res) => {
        if (res.data) {
          this.anime.set(res.data);
            this.isLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Error cargando detalles del anime:', err);

          this.isLoading.set(false);
      },
    });
  }

  getAnimeEpisodes(id: string, season?: number) {
     this.episodesRequest?.unsubscribe();
     this.episodesError.set(null);
     this.episodesLoading.set(true);
     this.episodesRequest = this.animeDetailService.getAnimeEpisodes(id, season).subscribe({
      next: (res) => {
        this.episodesLoading.set(false);
        if (res.data) {
          this.animeEpisodes.set(res.data);
          this.selectedSeasonID.set(res.data.currentSeason.seasonNumber.toString());
            this.isLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Error cargando episodios:', err);
        this.episodesLoading.set(false);
        this.episodesError.set('No fue posible cargar las temporadas. Inténtalo de nuevo.');
        this.isLoading.set(false);
      },
    });
  }
  
  toggleDropdownSeasons() {
    this.toggleDropdownSeasonsSignal.set(!this.toggleDropdownSeasonsSignal());
  }

  toggleSeason(season: AnimeSeason) {
    this.toggleDropdownSeasonsSignal.set(false);
    const animeId = this.animeId();
    if (animeId && season.seasonNumber.toString() !== this.selectedSeasonID()) {
      this.getAnimeEpisodes(animeId, season.seasonNumber);
    }
  }
  showFullDescriptionToggle() {
    this.showFullDescription.set(!this.showFullDescription());
  }

}
