import { Routes } from '@angular/router';
import { VideoPlayer } from './video-player/video-player';

export const routes: Routes = [
  { path: 'player', component: VideoPlayer },
  { path: 'watch', component: VideoPlayer },
];
