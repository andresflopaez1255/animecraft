import { Routes } from '@angular/router';
import { Home } from './home/home';
import { VideoPlayer } from './video-player/video-player';
import { AnimeDetail } from './anime-detail/anime-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'player', component: VideoPlayer },
  { path: 'watch', component: VideoPlayer },
  { path: 'anime/:id', component: AnimeDetail },
  { path: 'anime', component: AnimeDetail },
];
