import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../core/environments/environment';
import { API_URL } from '../core/config/constants';
import { PopularAnime } from '../core/interfaces/popular-anime';
import { ApiResponse } from '../core/interfaces/api-response';
import { mapToBannerItems } from '../core/interfaces/mappers/random-popular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroBannerService {
  private readonly http = inject(HttpClient);

  getRandomPopular(): Observable<PopularAnime[]> {
    return this.http
      .get<ApiResponse<PopularAnime[]>>(`${environment.apiURL}${API_URL.randomPopular}`)
      .pipe(
        map((response) => {
          const list = Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response)
            ? (response as unknown as PopularAnime[])
            : [];
          return mapToBannerItems(list);
        })
      );
  }
}
