import { Component, signal } from '@angular/core';
import { SectionTitle } from '../core/section-title/section-title';
import { LastEpisodiesItem, EpisodeItem } from './last-episodies-item/last-episodies-item';

@Component({
  imports: [LastEpisodiesItem, SectionTitle],
  selector: 'app-last-episodies',
  styleUrl: './last-episodies.css',
  templateUrl: './last-episodies.html',
})
export class LastEpisodies {
  readonly episodes = signal<EpisodeItem[]>([
    {
      id: 'voxel-1',
      title: 'Way of the Voxel Blade',
      episodeInfo: 'Episodio 24 • Temporada Final',
      timeAgo: 'Hace 20 min',
      timeColor: 'green',
      imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800',
      audioSubText: 'Sub Español',
      type: 'sub',
    },
    {
      id: 'golem-1',
      title: 'Taming the Golem & Spirit',
      episodeInfo: 'Episodio 6 • T1',
      timeAgo: 'Hace 1 hora',
      timeColor: 'neutral',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800',
      audioSubText: 'Audio Dual',
      type: 'dual',
      rpgIcons: true,
    },
    {
      id: 'redstone-1',
      title: 'Neon Redstone Protocol',
      episodeInfo: 'Episodio 18 • T2',
      timeAgo: 'Hace 3 horas',
      timeColor: 'neutral',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800',
      audioSubText: 'Sub Español',
      type: 'sub',
    },
    {
      id: 'village-1',
      title: 'Village & Pillager Chronicles',
      episodeInfo: 'Episodio 11 • T1',
      timeAgo: 'Hace 5 horas',
      timeColor: 'neutral',
      imageUrl: 'https://images.unsplash.com/photo-1542466500-dccb2789cbbb?q=80&w=800',
      audioSubText: 'Sub Español',
      type: 'sub',
    },
  ]);
}
