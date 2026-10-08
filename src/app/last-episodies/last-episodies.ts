import { Component, signal } from '@angular/core';
import { LastEpisodiesItem, EpisodeItem } from './last-episodies-item/last-episodies-item';

@Component({
  imports: [LastEpisodiesItem],
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
      imageUrl: '/episodes/way-of-the-voxel.jpg',
      audioSubText: 'Sub Español',
      type: 'sub',
    },
    {
      id: 'golem-1',
      title: 'Taming the Golem & Spirit',
      episodeInfo: 'Episodio 6 • T1',
      timeAgo: 'Hace 1 hora',
      timeColor: 'neutral',
      imageUrl: '/episodes/taming-the-golem.jpg',
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
      imageUrl: '/episodes/neon-redstone.jpg',
      audioSubText: 'Sub Español',
      type: 'sub',
    },
    {
      id: 'village-1',
      title: 'Village & Pillager Chronicles',
      episodeInfo: 'Episodio 11 • T1',
      timeAgo: 'Hace 5 horas',
      timeColor: 'neutral',
      imageUrl: '/episodes/village-and-pillager.jpg',
      audioSubText: 'Sub Español',
      type: 'sub',
    },
  ]);
}
