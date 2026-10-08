import { Component, input } from '@angular/core';

export interface EpisodeItem {
  id: string;
  title: string;
  episodeInfo: string;
  timeAgo: string;
  timeColor?: 'green' | 'neutral';
  imageUrl: string;
  audioSubText: string;
  type: 'sub' | 'dual';
  rpgIcons?: boolean;
}

@Component({
  imports: [],
  selector: 'app-last-episodies-item',
  styleUrl: './last-episodies-item.css',
  templateUrl: './last-episodies-item.html',
})
export class LastEpisodiesItem {
  readonly episode = input.required<EpisodeItem>();
}
