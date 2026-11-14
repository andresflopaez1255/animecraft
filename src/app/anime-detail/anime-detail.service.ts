import { inject, Injectable } from '@angular/core';
import { ApiClient } from '../core/config/api-client';
import { Anime } from '../core/interfaces/anim.interfaces';
import { ApiResponse } from '../core/interfaces/api-response';
import { AnimeEpisodesAndSeasonsResponse } from '../core/interfaces/anime-detail.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AnimeDetailService {


    private readonly api = inject(ApiClient);

    getAnimeDetail(id: string) {
        return this.api.get<ApiResponse<Anime>>(`/anime/${id}`);
    }

    getAnimeEpisodes(id: string, season?: number) {
        const query = season === undefined ? '' : `?season=${season}`;
        return this.api.get<ApiResponse<AnimeEpisodesAndSeasonsResponse>>(`/anime/${id}/episodes${query}`);
    }



}
