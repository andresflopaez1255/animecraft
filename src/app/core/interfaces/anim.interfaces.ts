import { CoverImage, Title } from "./common.interfaces";


export interface Anime {
    id:                number;
    idMal:             number;
    title:             Title;
    description:       string;
    coverImage:        CoverImage;
    bannerImage:       string;
    format:            string;
    status:            string;
    episodes:          number;
    duration:          number;
    genres:            string[];
    averageScore:      number;
    popularity:        number;
    season:            string;
    seasonYear:        number;
    nextAiringEpisode: null;
  
}



