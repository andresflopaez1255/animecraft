import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
  selector: 'app-last-episodies-item',
  styleUrl: './last-episodies-item.css',
  templateUrl: './last-episodies-item.html',
})
export class LastEpisodiesItem {
  readonly episode = input.required<EpisodeItem>();

  getEpisodeNumber(): number {
    const info = this.episode().episodeInfo || '';
    const match = info.match(/(\d+)/g);
    if (match && match.length > 0) {
      return parseInt(match[match.length - 1], 10);
    }
    return 1;
  }
}
