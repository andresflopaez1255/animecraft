import { inject, Injectable } from '@angular/core';
import { ApiClient } from '../core/config/api-client';
import { API_URL } from '../core/config/constants';
import { ApiResponse } from '../core/interfaces/api-response';
import { GenreCategory } from '../core/interfaces/category.interface';
import { PopularAnime } from '../core/interfaces/popular-anime';

@Injectable({
  providedIn: 'root',
})
export class AnimeGenresService {
  private readonly api = inject(ApiClient);

  getCategories() {
    return this.api.get<ApiResponse<GenreCategory[]>>(API_URL.categories);
  }

  getAnimesByGenre(genre: string, page = 1, perPage = 20) {
    return this.api.get<ApiResponse<PopularAnime[]>>(API_URL.byGenre, {
      params: { genre, page, perPage },
    });
  }
}
