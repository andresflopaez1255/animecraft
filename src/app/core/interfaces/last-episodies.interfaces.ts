import { ApiResponse } from './api-response';
import { Media } from './common.interfaces';

export interface LastEpisodiesSchedule {
  id: number;
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
  mediaId: number;
  media: Media;
}

export interface LastEpisodiesResponse extends ApiResponse<LastEpisodiesSchedule[]> {
  airingSchedules?: LastEpisodiesSchedule[];
}
