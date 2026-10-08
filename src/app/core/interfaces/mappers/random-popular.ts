import { BannerItem, PopularAnime } from "../popular-anime";



export function mapToBannerItems(data: PopularAnime[]): BannerItem[] {
  return data.map(item => ({
    title: `${item.title.romaji}`,
    bannerImage: item.bannerImage,
    description: item.description,
    format: item.format,
    episodeCount: item.episodes,
    genres: item.genres,
    averageScore: item.averageScore
  }))}