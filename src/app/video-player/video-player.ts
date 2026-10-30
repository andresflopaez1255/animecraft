import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import 'vidstack/player';
import 'vidstack/player/layouts/default';
import 'vidstack/player/ui';

import * as dashjs from 'dashjs';
import Hls from 'hls.js';

export interface TorrentItem {
  id: string;
  title: string;
  magnet: string;
  torrentUrl?: string;
  seeders: number;
  leechers: number;
  sizeBytes: number;
  sizeFormatted: string;
  episode?: number | null;
  resolution?: string;
  group?: string;
  provider: string;
}

export interface ServerOption {
  index: number;
  name: string;
  torrent: TorrentItem;
  sizeFormatted: string;
  resolution: string;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './video-player.html',
  styleUrl: './video-player.css',
})
export class VideoPlayer implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly API_URL = 'http://localhost:3000/api';

  // Controles de búsqueda
  readonly animeTitle = signal<string>('Sousou no Frieren');
  readonly episodeNumber = signal<number>(1);

  // Token de Real-Debrid
  readonly debridToken = signal<string>(
    typeof window !== 'undefined'
      ? localStorage.getItem('animecraft_debrid_token') || 'T4FNPK3XEOY4ZZMGXB45DVB75PIFJ2FUHO4PVGYRXWG7XKMQW3QA'
      : 'T4FNPK3XEOY4ZZMGXB45DVB75PIFJ2FUHO4PVGYRXWG7XKMQW3QA'
  );

  // Lista de torrents descargados
  readonly rawTorrents = signal<TorrentItem[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  // Servidor seleccionado (0: Server 1, 1: Server 2, 2: Server 3)
  readonly selectedServerIndex = signal<number>(0);

  // Solo los 3 servidores más livianos (ordenados de menor a mayor peso)
  readonly servers = computed<ServerOption[]>(() => {
    const list = [...this.rawTorrents()];
    if (list.length === 0) return [];

    // Filtramos los que no tengan tamaño válido
    const valid = list.filter((t) => {
      if (!t.sizeBytes || t.sizeBytes <= 0) return false;
      const title = t.title.toLowerCase();
      // Descartar DMCA bloqueados conocidos
      if (title.includes('toonshub') || title.includes('onalrie')) return false;
      // Descartar releases exclusivamente en inglés
      if (title.includes('dual audio') && !title.includes('multi') && !title.includes('spanish') && !title.includes('spa')) {
        return false;
      }
      return true;
    });

    // Ordenamos por peso ascendente (los más livianos primero)
    valid.sort((a, b) => a.sizeBytes - b.sizeBytes);

    return valid.slice(0, 3).map((torrent, idx) => ({
      index: idx,
      name: `Server ${idx + 1}`,
      torrent,
      sizeFormatted: torrent.sizeFormatted,
      resolution: torrent.resolution || '1080p',
    }));
  });

  // Torrent activo del servidor seleccionado
  readonly currentTorrent = computed<TorrentItem | null>(() => {
    const s = this.servers();
    const idx = this.selectedServerIndex();
    return s[idx]?.torrent ?? s[0]?.torrent ?? null;
  });

  // URL del stream de video en Debrid
  readonly streamUrl = computed<string>(() => {
    const torrent = this.currentTorrent();
    if (!torrent || !torrent.magnet) return '';

    const token = this.debridToken().trim();
    const tokenParam = token ? `&token=${encodeURIComponent(token)}` : '';
    return `${this.API_URL}/debrid/stream?magnet=${encodeURIComponent(torrent.magnet)}${tokenParam}`;
  });

  // URL de los subtítulos extraídos en formato WebVTT
  readonly subtitleUrl = computed<string>(() => {
    const torrent = this.currentTorrent();
    if (!torrent || !torrent.magnet) return '';

    const token = this.debridToken().trim();
    const tokenParam = token ? `&token=${encodeURIComponent(token)}` : '';
    return `${this.API_URL}/debrid/subtitles?magnet=${encodeURIComponent(torrent.magnet)}${tokenParam}`;
  });

  // Lista de pistas de texto (subtítulos) para Vidstack
  readonly textTracks = computed(() => {
    const url = this.subtitleUrl();
    if (!url) return [];
    return [
      {
        src: url,
        label: 'Español (Latino)',
        language: 'es-419',
        kind: 'subtitles' as const,
        default: true,
        type: 'vtt' as const,
      },
    ];
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const title = params.get('title');
      const ep = params.get('episode');
      if (title) {
        this.animeTitle.set(title);
      }
      if (ep) {
        const epNum = parseInt(ep, 10);
        if (!isNaN(epNum)) {
          this.episodeNumber.set(epNum);
        }
      }
      this.fetchServers();
    });
  }

  updateDebridToken(token: string): void {
    this.debridToken.set(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('animecraft_debrid_token', token.trim());
    }
    this.fetchServers();
  }

  /**
   * Carga los episodios en 1080p y máximo 500 MB
   */
  fetchServers(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const title = encodeURIComponent(this.animeTitle().trim());
    const ep = this.episodeNumber();
    const url = `${this.API_URL}/torrents/episodes?title=${title}&episode=${ep}&quality=1080p&maxSizeMb=500`;

    this.http.get<{ success: boolean; data: TorrentItem[]; count: number }>(url).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data && res.data.length > 0) {
          this.rawTorrents.set(res.data);
          this.selectedServerIndex.set(0); // Seleccionar Server 1 (el más liviano)
        } else {
          this.rawTorrents.set([]);
          this.errorMessage.set('No se encontraron servidores 1080p ligeros para este episodio.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.rawTorrents.set([]);
        this.errorMessage.set('Error conectando con animecraft-api (http://localhost:3000).');
        console.error('Error fetching servers:', err);
      },
    });
  }

  selectServer(index: number): void {
    this.selectedServerIndex.set(index);
    this.errorMessage.set(null);
  }

  changeEpisode(delta: number): void {
    const next = Math.max(1, this.episodeNumber() + delta);
    if (next !== this.episodeNumber()) {
      this.episodeNumber.set(next);
      this.fetchServers();
    }
  }

  onProviderChange(event: Event): void {
    const provider = (event as CustomEvent).detail;
    if (!provider) return;

    if (provider.type === 'DASH') {
      provider.library = dashjs;
    }
    if (provider.type === 'HLS') {
      provider.library = Hls;
    }
    if (provider.type === 'video' && provider.video) {
      provider.video.crossOrigin = 'anonymous';
    }
  }

  onCanPlay(event: Event): void {
    const player = event.target as any;
    if (player && player.textTracks) {
      for (let i = 0; i < player.textTracks.length; i++) {
        const track = player.textTracks[i];
        if (track.kind === 'subtitles' || track.kind === 'captions') {
          track.mode = 'showing';
          break;
        }
      }
    }
  }

  onPlayerError(event: Event): void {
    const detail = (event as CustomEvent).detail;
    console.warn('Vidstack error:', detail);
  }
}
