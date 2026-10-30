import { PopularAnime, BannerItem } from '../popular-anime';

export function mapToBannerItems(data: PopularAnime[]): (PopularAnime & BannerItem)[] {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    ...item,
    bannerImage:
      item.bannerImage ||
      item.coverImage?.extraLarge ||
      item.coverImage?.large ||
      '',
    episodeCount: item.episodes || 0,
  }));
}
