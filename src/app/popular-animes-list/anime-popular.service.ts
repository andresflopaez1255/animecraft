import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../core/environments/environment';
import { API_URL } from '../core/config/constants';
import { ApiResponse } from '../core/interfaces/api-response';
import { PopularAnime } from '../core/interfaces/popular-anime';

@Injectable({
  providedIn: 'root',
})
export class AnimePopularService {
  private readonly http = inject(HttpClient);

  getPopularList() {
    return this.http.get<ApiResponse<PopularAnime[]>>(`${environment.apiURL}${API_URL.animePopular}`);
  }
}
