import { Component, OnInit, OnDestroy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroBannerService } from './hero-banner.service';
import { PopularAnime } from '../core/interfaces/popular-anime';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css',
})
export class HeroBanner implements OnInit, OnDestroy {
  readonly animes = signal<PopularAnime[]>([]);
  readonly currentIndex = signal(0);
  readonly currentAnime = computed(() => this.animes()[this.currentIndex()]);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  private readonly service = inject(HeroBannerService);  

  ngOnInit() {
    this.service.getRandomPopular().subscribe({
      next: (data) => {
        this.animes.set(data);

        console.log('Datos del hero banner cargados:', data);
        this.startCarousel();
      },
      error: (err) => console.error('Error al cargar datos del hero banner:', err),
    });
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.stopCarousel();
    if (this.animes().length > 1) {
      this.intervalId = setInterval(() => {
        this.next();
      }, 6000);
    }
  }

  stopCarousel() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  next() {
    const animes = this.animes();
    if (animes.length > 0) {
      this.currentIndex.update((index) => (index + 1) % animes.length);
    }
  }
  
  prev() {
    const animes = this.animes();
    if (animes.length > 0) {
      this.currentIndex.update((index) => (index - 1 + animes.length) % animes.length);
    }
  }

  setIndex(index: number) {
    this.currentIndex.set(index);
    this.stopCarousel();
    this.startCarousel();
  }
}
