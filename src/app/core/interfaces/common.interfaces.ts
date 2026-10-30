export interface CoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

export interface Title {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

export interface Media {
  id: number;
  title: Title;
  coverImage: CoverImage;
  bannerImage?: string;
  format?: string;
  status?: string;
  episodes?: number;
  genres?: string[];
  isAdult?: boolean;
}
