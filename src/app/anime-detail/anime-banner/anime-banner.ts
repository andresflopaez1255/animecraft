import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Anime } from '../../core/interfaces/anim.interfaces';

@Component({
  imports: [RouterLink],
  selector: 'app-anime-banner',
  templateUrl: './anime-banner.html',
})
export class AnimeBanner {
  item = input<Anime | null>(null);
}
