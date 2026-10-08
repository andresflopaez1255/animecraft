export interface PopularAnime {
    id: number;
    idMal: number;
    title: Title;
    description: string;
    coverImage: CoverImage;
    bannerImage: string;
    format: string;
    status: string;
    episodes: number;
    duration: number;
    genres: string[];
    averageScore: number;
    popularity: number;
    season: string;
    seasonYear: number;
    startDate: StartDate;
    nextAiringEpisode: null;
}

export interface CoverImage {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
}

export interface StartDate {
    year: number;
    month: number;
    day: number;
}

export interface Title {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
}


export interface BannerItem {
    title: string;
    bannerImage: string;
    description: string;
    format: string;
    episodeCount: number;
    averageScore: number
    genres: string[];
}