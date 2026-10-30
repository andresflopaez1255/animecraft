import { Component, Input } from '@angular/core';
import WatchlistItem from './watchlist-item/watchlist-item';
import { SectionTitle } from '../core/section-title/section-title';
export interface IWatchlistItem {
  id: number;
  title: string;
  episode: number;
  totalEpisodes: number;
  episodeTitle: string;
  minutesRemaining: number;
  progress: number;
  image: string;
}

export const WATCHLIST_MOCK: IWatchlistItem[] = [
  {
    id: 1,
    title: "Blade of the Overworld",
    episode: 8,
    totalEpisodes: 12,
    episodeTitle: "La Forja de Obsidiana",
    minutesRemaining: 18,
    progress: 75,
    image:
      "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800",
  },
  {
    id: 2,
    title: "Shadow Alchemist",
    episode: 12,
    totalEpisodes: 24,
    episodeTitle: "Esencia del Vacío",
    minutesRemaining: 5,
    progress: 90,
    image:
      "https://images.unsplash.com/photo-1542382156909-9240890bf227?q=80&w=800",
  },
  {
    id: 3,
    title: "Frieren: Beyond Journey's End",
    episode: 20,
    totalEpisodes: 28,
    episodeTitle: "El examen de magos",
    minutesRemaining: 8,
    progress: 72,
    image:
      "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
  },

/*   {
    id: 4,
    title: "One Piece",
    episode: 1090,
    totalEpisodes: 1150,
    episodeTitle: "El nuevo mundo",
    minutesRemaining: 15,
    progress: 47,
    image:
      "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
  },

  {
    id: 5,
    title: "Attack on Titan",
    episode: 8,
    totalEpisodes: 12,
    episodeTitle: "El sótano",
    minutesRemaining: 7,
    progress: 83,
    image:
      "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
  },

  {
    id: 6,
    title: "My Hero Academia",
    episode: 13,
    totalEpisodes: 25,
    episodeTitle: "El héroe número uno",
    minutesRemaining: 12,
    progress: 61,
    image:
      "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
  },

  {
    id: 7,
    title: "Death Note",
    episode: 24,
    totalEpisodes: 37,
    episodeTitle: "Resurrección",
    minutesRemaining: 18,
    progress: 54,
    image:
      "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
  },

  {
    id: 8,
    title: "Naruto",
    episode: 147,
    totalEpisodes: 220,
    episodeTitle: "La batalla continúa",
    minutesRemaining: 9,
    progress: 76,
    image:
      "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
  },

  {
    id: 9,
    title: "Bleach",
    episode: 186,
    totalEpisodes: 366,
    episodeTitle: "El poder del Shinigami",
    minutesRemaining: 14,
    progress: 43,
    image:
      "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
  },

  {
    id: 10,
    title: "Mob Psycho 100",
    episode: 7,
    totalEpisodes: 12,
    episodeTitle: "El despertar del poder",
    minutesRemaining: 11,
    progress: 69,
    image:
      "https://cdn.myanimelist.net/images/anime/5/79183l.jpg",
  }, */
];
@Component({
  imports: [
    WatchlistItem,
    SectionTitle
  ],
  selector: 'app-watchlist',
  styleUrl: './watchlist.css',
  templateUrl: './watchlist.html',
})
export default class Watchlist {
  watchlist: IWatchlistItem[] = WATCHLIST_MOCK;
  onWatchlistWheel(event: WheelEvent): void {
    const container = event.currentTarget as HTMLElement;
  
    if (event.deltaY === 0) {
      return;
    }
  
    event.preventDefault();
  
    container.scrollLeft += event.deltaY;
  }
}

