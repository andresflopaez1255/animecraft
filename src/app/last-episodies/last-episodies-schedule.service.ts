import { inject, Injectable } from '@angular/core';
import { ApiClient } from '../core/config/api-client';
import { ApiResponse } from '../core/interfaces/api-response';
import { LastEpisodiesSchedule } from '../core/interfaces/last-episodies.interfaces';
import { API_URL } from '../core/config/constants';

@Injectable({
  providedIn: 'root',
})
export class LastEpisodiesScheduleService {
  private readonly api = inject(ApiClient);

  getLastEpisodies(range: string = 'week') {
    return this.api.get<ApiResponse<LastEpisodiesSchedule[]>>(API_URL.lastEpisodies, {
      params: { range },
    });
  }
}
