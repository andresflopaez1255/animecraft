import { Component, signal } from '@angular/core';

export interface GenreItem {
  id: string;
  name: string;
  count: string;
  countColor: string;
  gradientClass: string;
  borderClass: string;
  iconType: 'swords' | 'compass' | 'stars' | 'csv' | 'ninja' | 'skull' | 'heart' | 'scifi';
}

@Component({
  imports: [],
  selector: 'app-anime-genres',
  styleUrl: './anime-genres.css',
  templateUrl: './anime-genres.html',
})
export class AnimeGenres {
  readonly genres = signal<GenreItem[]>([
    {
      id: 'accion',
      name: 'Acción',
      count: '142 títulos',
      countColor: 'text-[#86efac]',
      gradientClass: 'from-[#1a3820] to-[#0e2013]',
      borderClass: 'border-[#2d5635]/40 hover:border-[#4ade80]/50 hover:shadow-emerald-950/40',
      iconType: 'swords',
    },
    {
      id: 'aventura',
      name: 'Aventura',
      count: '98 títulos',
      countColor: 'text-[#d4a359]',
      gradientClass: 'from-[#3b271d] to-[#20140e]',
      borderClass: 'border-[#5a3c2c]/40 hover:border-[#d4a359]/50 hover:shadow-amber-950/40',
      iconType: 'compass',
    },
    {
      id: 'fantasia',
      name: 'Fantasía',
      count: '165 títulos',
      countColor: 'text-[#d4c39e]',
      gradientClass: 'from-[#2b2920] to-[#161510]',
      borderClass: 'border-[#4c4737]/40 hover:border-[#eab308]/50 hover:shadow-yellow-950/40',
      iconType: 'stars',
    },
    {
      id: 'isekai',
      name: 'Isekai',
      count: '84 títulos',
      countColor: 'text-[#9ca3af]',
      gradientClass: 'from-[#22262c] to-[#131518]',
      borderClass: 'border-[#373d47]/40 hover:border-[#4ade80]/50 hover:shadow-neutral-900/50',
      iconType: 'csv',
    },
    {
      id: 'shonen',
      name: 'Shonen',
      count: '119 títulos',
      countColor: 'text-[#86efac]',
      gradientClass: 'from-[#17341e] to-[#0d1e11]',
      borderClass: 'border-[#275330]/40 hover:border-[#4ade80]/50 hover:shadow-emerald-950/40',
      iconType: 'ninja',
    },
    {
      id: 'terror-nether',
      name: 'Terror & Nether',
      count: '37 títulos',
      countColor: 'text-[#f87171]',
      gradientClass: 'from-[#4d161d] to-[#250a0e]',
      borderClass: 'border-[#71222c]/40 hover:border-[#f87171]/50 hover:shadow-rose-950/40',
      iconType: 'skull',
    },
    {
      id: 'romance',
      name: 'Romance & Slice',
      count: '64 títulos',
      countColor: 'text-[#f472b6]',
      gradientClass: 'from-[#3d1832] to-[#1c0a17]',
      borderClass: 'border-[#5c244b]/40 hover:border-[#f472b6]/50 hover:shadow-pink-950/40',
      iconType: 'heart',
    },
    {
      id: 'scifi',
      name: 'Sci-Fi & Mecha',
      count: '53 títulos',
      countColor: 'text-[#38bdf8]',
      gradientClass: 'from-[#122c3e] to-[#08151f]',
      borderClass: 'border-[#1b435e]/40 hover:border-[#38bdf8]/50 hover:shadow-sky-950/40',
      iconType: 'scifi',
    },
  ]);
}
