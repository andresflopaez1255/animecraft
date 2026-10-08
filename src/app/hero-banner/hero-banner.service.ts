import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../core/environments/environment';
import { API_URL } from '../core/config/constants';
import { PopularAnime } from '../core/interfaces/popular-anime';
import { mapToBannerItems } from '../core/interfaces/mappers/random-popular';
import { map } from 'rxjs'; // Operador de transformación de RxJS

@Injectable({
    providedIn: 'root'
})
export class HeroBannerService {

    private http = inject(HttpClient);

   
    getRandomPopular() {
        return this.http.get<any>(`${environment.apiURL}${API_URL.randomPopular}`)
            .pipe(
              
                map(response => {
                    const data = response.data ? response.data : response;
                    return mapToBannerItems(data);
                })
            );
    }
}