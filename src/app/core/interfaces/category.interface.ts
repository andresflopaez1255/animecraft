export interface GenreCategory {
  id: string;
  name: string;
  genre: string;
  count: string;
  countColor: string;
  gradientClass: string;
  borderClass: string;
  iconType: 'swords' | 'compass' | 'stars' | 'csv' | 'ninja' | 'skull' | 'heart' | 'scifi';
}
