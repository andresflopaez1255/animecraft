import { Component, Input } from '@angular/core';

interface Anime {
  title: string;
  image: string;
  rating: number;
  genre: string;
  badge: string;
  badgeType: string;
}

@Component({
  selector: 'app-popular-animes-item',
  standalone: true,
  imports: [],
  templateUrl: './popular-animes-item.html'
})
export class PopularAnimesItem {
  @Input({ required: true }) anime!: Anime;
  @Input({ required: true }) index!: number;
}
