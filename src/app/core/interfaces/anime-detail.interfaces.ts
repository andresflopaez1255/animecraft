import { Title } from './common.interfaces';

export type AnimeRelationType =
  | 'CURRENT'
  | 'SIDE_STORY'
  | 'ALTERNATIVE'
  | 'SPIN_OFF'
  | 'CHARACTER';

export type AnimeSeasonName = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER';

export interface AnimeSeason {
  id: number;
  idMal: number;
  seasonNumber: number;
  title: string;
  relationType: AnimeRelationType;
  format: string;
  season: AnimeSeasonName;
  seasonYear: number;
  episodes: number;
  coverImage: string;
  isCurrent: boolean;
  isMainStory: boolean;
}

export interface AnimeEpisode {
  episodeNumber: number;
  title: string;
  originalTitle: string;
  thumbnail: string;
  url: string;
  site: string;
  duration: number;
  description: string | null;
}

export interface AnimeEpisodesAndSeasonsResponse {
  animeId: number;
  idMal: number;
  title: Title;
  format: string;
  status: string;
  totalEpisodes: number;
  currentSeason: AnimeSeason;
  seasons: AnimeSeason[];
  related: AnimeSeason[];
  episodes: AnimeEpisode[];
}
