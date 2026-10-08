import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroBannerService } from './hero-banner.service';
import { BannerItem } from '../core/interfaces/popular-anime';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  templateUrl: './hero-banner.html',
})
export class HeroBanner implements OnInit {
  ngOnInit(): void {
    this.getItemBanner()
  }

  heroBannerService = inject(HeroBannerService)
  bannerItems = signal<BannerItem[]>([])
  bannerCurrentIndex = signal<number>(0)
  private touchStartX = 0;
  private minSwipeDistance = 50; // Distancia mínima en píxeles para que cuente como deslizamiento
  // --- EVENTOS PARA CELULAR (Táctil) ---
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeDirection(touchEndX);
  }
  // --- EVENTOS PARA PC (Mouse) ---
  onMouseDown(event: MouseEvent) {
    this.touchStartX = event.screenX;
  }
  onMouseUp(event: MouseEvent) {
    const touchEndX = event.screenX;
    this.handleSwipeDirection(touchEndX);
  }
  // --- LÓGICA PRINCIPAL DEL SWIPE ---
  handleSwipeDirection(touchEndX: number) {
    const difference = this.touchStartX - touchEndX;
    // Comprobamos que el arrastre fue mayor a 50px (evita clics accidentales)
    if (Math.abs(difference) > this.minSwipeDistance) {
      if (difference > 0) {
        // Deslizó hacia la izquierda <-
        this.nextPage();
      } else {
        // Deslizó hacia la derecha ->
        this.beforePage();
      }
    }
  }



  getItemBanner() {
    this.heroBannerService.getRandomPopular().subscribe({
      next: (result) => {
        console.log(result)
        this.bannerItems.set(result)
        this.onScrollAnimationPage() // <-- Inicia el carrusel una vez que hay datos
      }
    })

  }

  nextPage() {
    const total = this.bannerItems().length;
    if (total === 0) return;

    return this.bannerCurrentIndex.update(index => (index + 1) % total)
  }

  beforePage() {
    const total = this.bannerItems().length;
    if (total === 0) return;

    return this.bannerCurrentIndex.update(index => (index - 1 + total) % total)
  }

  onScrollAnimationPage() {
    setInterval(() => {
      this.nextPage();
    }, 5000); // <-- Cambiado de 100 a 5000 (5 segundos)
  }


}
