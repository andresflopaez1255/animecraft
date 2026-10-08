import { Component } from '@angular/core';
import { SectionTitle } from '../core/section-title/section-title';
import { PopularAnimesItem } from './popular-animes-item/popular-animes-item';

@Component({
  imports: [
    SectionTitle,
    PopularAnimesItem
  ],
  selector: 'app-popular-animes-list',
  templateUrl: './popular-animes-list.html',
})
export class PopularAnimesList {
  
  animes = [
    {
      title: 'The Emerald Sovereign',
      image: 'https://images.unsplash.com/photo-1590608882583-b7159d2909cc?q=80&w=800',
      rating: 4.95,
      genre: 'Fantasia',
      badge: 'HD',
      badgeType: 'HD'
    },
    {
      title: 'Deep Dark Requiem',
      image: 'https://images.unsplash.com/photo-1542466500-dccb2789cbbb?q=80&w=800',
      rating: 4.88,
      genre: 'Terror',
      badge: 'SUB',
      badgeType: 'SUB'
    },
    {
      title: 'Redstone Chronicles',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800',
      rating: 4.81,
      genre: 'Acción',
      badge: 'DOBLAJE',
      badgeType: 'DOBLAJE'
    },
    {
      title: 'Diamond Heart',
      image: 'https://images.unsplash.com/photo-1616089332560-6b3a0ed3fdf4?q=80&w=800',
      rating: 4.75,
      genre: 'Aventura',
      badge: 'HD',
      badgeType: 'HD'
    }
  ];

  onWatchlistWheel(event: WheelEvent): void {
    const container = event.currentTarget as HTMLElement;
    if (event.deltaY === 0) return;
    event.preventDefault();
    container.scrollLeft += event.deltaY;
  }
}
