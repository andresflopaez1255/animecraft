import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopularAnime } from '../../core/interfaces/popular-anime';

@Component({
  selector: 'app-popular-animes-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './popular-animes-item.html',
})
export class PopularAnimesItem {
  @Input({ required: true }) anime!: PopularAnime;
  @Input({ required: true }) index!: number;
}
