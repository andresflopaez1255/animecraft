import { Component, ElementRef, OnDestroy, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

interface TorrentOption { id: string; title: string; magnet: string; sizeFormatted: string; sizeBytes: number; seeders: number; resolution: string; }

interface VideoSource {
  name: string;
  provider: string;
  url: string;
  kind: 'video' | 'iframe';
  sourceUrl?: string;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './video-player.html',
  styleUrl: './video-player.css',
})
export class VideoPlayer implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly API_URL = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' ? window.location.origin : 'http://localhost:3000') + '/api';
  private request?: Subscription;
  private torrentRequest?: Subscription;
  private debridRequest?: Subscription;
  private durationRequest?: Subscription;
  @ViewChild('torrentVideo') torrentVideo?: ElementRef<HTMLVideoElement>;
  @ViewChild('playerShell') playerShell?: ElementRef<HTMLElement>;
  @ViewChild('directVideo') directVideo?: ElementRef<HTMLVideoElement>;
  private subtitleRequest?: Subscription;
  private controlsTimer?: ReturnType<typeof setTimeout>;
  private routeRequest?: Subscription;

  readonly animeTitle = signal('');
  readonly episodeNumber = signal(1);
  readonly seasonNumber = signal(1);
  readonly seasonTitle = signal<string | null>(null);
  readonly alternateTitle = signal<string | null>(null);
  readonly sources = signal<VideoSource[]>([]);
  readonly activeTab = signal<'sources' | 'torrents'>('sources');
  readonly torrents = signal<TorrentOption[]>([]);
  readonly selectedTorrent = signal<TorrentOption | null>(null);
  readonly torrentLoading = signal(false);
  readonly debridLoading = signal(false);
  readonly torrentMessage = signal<string | null>(null);
  readonly torrentDuration = signal(0);
  readonly torrentOffset = signal(0);
  readonly torrentPosition = signal(0);
  readonly torrentPlaying = signal(false);
  readonly playerLoading = signal(false);
  readonly audioTracks = signal<Array<{ index: number; language: string; label: string }>>([]);
  readonly audioTrack = signal(0);
  readonly subtitlesEnabled = signal(true);
  readonly subtitleSize = signal(100);
  readonly subtitleColor = signal("#ffffff");
  readonly subtitleBackground = signal("transparent");
  readonly settingsOpen = signal(false);
  readonly controlsVisible = signal(true);
  readonly volumeOpen = signal(false);
  readonly subtitlesComplete = signal(false);
  readonly subtitlesAvailable = signal(false);
  readonly subtitleLoading = signal(false);
  readonly subtitleError = signal(false);
  readonly subtitleUrl = computed(() => { const torrent = this.selectedTorrent(); if (!torrent) return null; const params = new URLSearchParams({ magnet: torrent.magnet, episode: String(this.episodeNumber()), season: String(this.seasonNumber()), start: String(this.torrentOffset()) }); if (!this.subtitlesComplete() && this.torrentOffset() === 0) params.set('preview', '1'); return `${this.API_URL}/debrid/subtitles?${params}`; });
  readonly torrentVolume = signal(1);
  readonly torrentStreamUrl = computed(() => {
    const torrent = this.selectedTorrent();
    if (!torrent) return null;
    const params = new URLSearchParams({ magnet: torrent.magnet, episode: String(this.episodeNumber()), season: String(this.seasonNumber()), transcode: '1', start: String(this.torrentOffset()), audio: String(this.audioTrack()) });
    return `${this.API_URL}/debrid/stream?${params.toString()}`;
  });
  readonly selectedSource = signal<VideoSource | null>(null);
  readonly sourceHost = computed(() => {
    try { return new URL(this.selectedSource()?.url || '').hostname; } catch { return ''; }
  });
  readonly embedUrl = computed(() => {
    const source = this.selectedSource();
    if (!source || source.kind !== 'iframe' || ['www.fembed.com'].includes(this.sourceHost())) return null;
    try {
      const url = new URL(source.url);
      const hosts = ['bysesukior.com', 'mega.nz', 'ok.ru', 'player.abyssplayer.com', 'drive.google.com', 'clipwatching.com', 'www.fembed.com', 'hqq.ac', 'voe.sx', 'www.mp4upload.com', 'mp4upload.com', 'streamtape.com', 'ani.dramav1.cfd', 'player.zilla-networks.com'];
      if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443') || !hosts.includes(url.hostname)) return null;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url.href);
    } catch { return null; }
  });
  readonly loading = signal(false);
  readonly message = signal<string | null>(null);
  readonly providerWarning = signal<string | null>(null);

  ngOnInit(): void {
    this.routeRequest = this.route.queryParamMap.subscribe(params => {
      this.animeTitle.set(params.get('title') || '');
      this.seasonTitle.set(params.get('seasonTitle'));
      this.alternateTitle.set(params.get('alternateTitle'));
      const episode = Number(params.get('episode'));
      const season = Number(params.get('season'));
      this.episodeNumber.set(Number.isInteger(episode) && episode > 0 ? episode : 1);
      this.seasonNumber.set(Number.isInteger(season) && season > 0 ? season : 1);
      this.searchSources();
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.controlsTimer);
    this.request?.unsubscribe();
    this.torrentRequest?.unsubscribe();
    this.debridRequest?.unsubscribe();
    this.durationRequest?.unsubscribe();
    this.routeRequest?.unsubscribe();
    this.subtitleRequest?.unsubscribe();
  }

  searchSources(): void {
    this.request?.unsubscribe();
    this.torrentRequest?.unsubscribe();
    this.debridRequest?.unsubscribe();
    this.debridLoading.set(false);
    this.torrents.set([]);
    this.selectedTorrent.set(null);
    this.torrentDuration.set(0);
    this.torrentOffset.set(0);
    this.torrentPosition.set(0);
    this.torrentMessage.set(null);
    this.sources.set([]);
    this.selectedSource.set(null);
    this.message.set(null);
    this.providerWarning.set(null);
    const seasonTitle = this.seasonTitle();
    const title = (seasonTitle || this.animeTitle()).trim();
    if (!title) { this.loading.set(false); this.message.set('Escribe el nombre del anime para buscar.'); return; }
    if ((!seasonTitle && this.seasonNumber() > 1) || (seasonTitle && /^temporada\s+\d+$/i.test(seasonTitle))) {
      this.loading.set(false);
      this.message.set('No se pudo identificar esta temporada con suficiente seguridad.');
      return;
    }
    this.loading.set(true);
    this.searchTorrents();
    this.request = this.http.get<{ data: { sources: VideoSource[]; unavailable: string[] } }>(`${this.API_URL}/sources`, {
      params: { title, episode: String(this.episodeNumber()), season: String(this.seasonNumber()) },
    }).subscribe({
      next: response => {
        this.loading.set(false);
        this.sources.set(response.data.sources);
        if (!response.data.sources.length) this.message.set('No se encontraron fuentes para este episodio.');
        if (response.data.unavailable.length) this.providerWarning.set(`No se pudo consultar: ${response.data.unavailable.join(', ')}.`);
      },
      error: () => { this.loading.set(false); this.message.set('No se pudieron consultar las fuentes. Inténtalo de nuevo.'); },
    });
  }

  selectSource(source: VideoSource): void {
    this.selectedTorrent.set(null);
    this.selectedSource.set(source);
    this.playerLoading.set(true);
    this.message.set(null);
  }

  onVideoError(source: VideoSource): void {
    if (this.selectedSource()?.url !== source.url) return;
    this.playerLoading.set(false);
    this.message.set('No se pudo reproducir esta fuente. Prueba otra si está disponible.');
  }

  showTab(tab: 'sources' | 'torrents'): void {
    this.activeTab.set(tab);
    if (tab === 'torrents' && !this.torrents().length && !this.torrentLoading()) this.searchTorrents();
  }

  searchTorrents(): void {
    this.torrentRequest?.unsubscribe();
    this.debridRequest?.unsubscribe();
    this.durationRequest?.unsubscribe();
    this.debridLoading.set(false);
    this.torrents.set([]);
    this.torrentMessage.set(null);
    const specificTitle = this.seasonTitle();
    const title = (specificTitle && !/^temporada\s+\d+$/i.test(specificTitle) ? specificTitle : this.animeTitle()).trim();
    if (!title) { this.torrentMessage.set('Escribe el nombre del anime para buscar.'); return; }
    this.torrentLoading.set(true);
    this.torrentRequest = this.http.get<{ data: TorrentOption[] }>(`${this.API_URL}/torrents/episodes`, {
      params: { title, alternateTitle: this.alternateTitle() || '', episode: String(this.episodeNumber()), season: String(this.seasonNumber()), quality: '' },
    }).subscribe({
      next: response => {
        this.torrentLoading.set(false);
        this.torrents.set([...response.data].sort((a, b) => (a.sizeBytes > 0 ? a.sizeBytes : Infinity) - (b.sizeBytes > 0 ? b.sizeBytes : Infinity)));
        if (!response.data.length) this.torrentMessage.set('No se encontraron torrents para este capítulo y temporada.');
      },
      error: () => { this.torrentLoading.set(false); this.torrentMessage.set('No se pudieron buscar torrents. Inténtalo de nuevo.'); },
    });
  }

  selectTorrent(torrent: TorrentOption): void {
    this.debridRequest?.unsubscribe();
    this.selectedSource.set(null);
    this.selectedTorrent.set(null);
    this.torrentOffset.set(0);
    this.torrentPosition.set(0);
    this.torrentDuration.set(0);
    this.torrentMessage.set(null);
    this.subtitleRequest?.unsubscribe();
    this.subtitlesComplete.set(false);
    this.subtitlesAvailable.set(false);
    this.subtitleLoading.set(true);
    this.subtitleError.set(false);
    this.audioTracks.set([]);
    this.audioTrack.set(0);
    this.playerLoading.set(true);
    this.debridLoading.set(true);
    this.debridRequest = this.http.get<{ success: boolean }>(`${this.API_URL}/debrid/resolve`, {
      params: { magnet: torrent.magnet, episode: String(this.episodeNumber()), season: String(this.seasonNumber()) },
    }).subscribe({
      next: () => {
        this.debridLoading.set(false);
        this.selectedTorrent.set(torrent);
        this.subtitleRequest = this.http.get(`${this.API_URL}/debrid/subtitles`, { params: { magnet: torrent.magnet, episode: String(this.episodeNumber()), season: String(this.seasonNumber()) }, responseType: 'text' }).subscribe({ next: text => { if (this.selectedTorrent()?.id === torrent.id) { this.subtitlesAvailable.set(text.includes("-->")); this.subtitlesComplete.set(true); this.subtitleLoading.set(false); if (!text.includes("-->")) this.subtitleError.set(true); } }, error: () => { this.subtitleLoading.set(false); this.subtitleError.set(true); } });
        this.http.get<{ data: { audio: Array<{ index: number; language: string; label: string }> } }>(`${this.API_URL}/debrid/tracks`, { params: { magnet: torrent.magnet, episode: String(this.episodeNumber()), season: String(this.seasonNumber()) } }).subscribe({ next: result => { if (this.selectedTorrent()?.id === torrent.id) { this.audioTracks.set(result.data.audio); const japanese = result.data.audio.find(t => /^(ja|jpn|jp)$/i.test(t.language)); if (japanese && this.audioTrack() === 0 && japanese.index !== 0) this.changeAudio(String(japanese.index)); } }, error: () => {} });
        this.durationRequest = this.http.get<{ data: { seconds: number } }>(`${this.API_URL}/debrid/duration`, {
          params: { magnet: torrent.magnet, episode: String(this.episodeNumber()), season: String(this.seasonNumber()) },
        }).subscribe({ next: response => this.torrentDuration.set(Math.floor(response.data.seconds)), error: () => this.torrentMessage.set('No se pudo detectar la duración total de este archivo.') });
      },
      error: error => {
        this.debridLoading.set(false);
        this.playerLoading.set(false);
        this.torrentMessage.set(error?.error?.error || 'Real-Debrid no pudo preparar este episodio. Prueba otro paquete.');
      },
    });
  }

  revealControls(): void {
    this.controlsVisible.set(true);
    clearTimeout(this.controlsTimer);
    this.controlsTimer = setTimeout(() => {
      if (this.torrentPlaying() && !this.settingsOpen() && !this.playerShell?.nativeElement.querySelector('.player-controls :focus-visible')) {
        this.controlsVisible.set(false);
        this.volumeOpen.set(false);
      }
    }, 3000);
  }

  playbackState(playing: boolean): void {
    this.torrentPlaying.set(playing);
    this.revealControls();
  }

  toggleTorrentPlayback(): void {
    const video = this.torrentVideo?.nativeElement;
    if (!video) return;
    if (video.paused) void video.play().catch(() => this.onTorrentError());
    else video.pause();
  }

  updateTorrentPosition(): void {
    const video = this.torrentVideo?.nativeElement;
    if (video) this.torrentPosition.set(Math.min(this.torrentDuration() || Infinity, this.torrentOffset() + video.currentTime));
  }

  seekTorrent(value: string): void {
    const seconds = Number(value);
    if (!Number.isFinite(seconds) || seconds < 0 || !this.torrentDuration()) return;
    this.torrentMessage.set(null);
    this.playerLoading.set(true);
    this.torrentOffset.set(Math.min(seconds, Math.max(0, this.torrentDuration() - 1)));
    this.torrentPosition.set(seconds);
    this.torrentPlaying.set(false);
    setTimeout(() => { const video = this.torrentVideo?.nativeElement; if (video) { video.load(); void video.play().catch(() => {}); } }, 0);
  }

  setTorrentVolume(value: string): void {
    const volume = Math.min(1, Math.max(0, Number(value)));
    this.torrentVolume.set(volume);
    if (this.torrentVideo) this.torrentVideo.nativeElement.volume = volume;
  }

  formatTime(seconds: number): string {
    if (!Number.isFinite(seconds)) return '0:00';
    const total = Math.floor(seconds);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  onTorrentError(): void {
    this.playerLoading.set(false);
    this.torrentMessage.set('Este torrent no se pudo reproducir. Prueba otro paquete.');
  }

  changeAudio(value: string): void {
    const index = Number(value);
    if (!Number.isInteger(index) || index === this.audioTrack()) return;
    this.torrentOffset.set(Math.floor(this.torrentPosition()));
    this.audioTrack.set(index);
    this.playerLoading.set(true);
    setTimeout(() => { const video = this.torrentVideo?.nativeElement; if (video) { video.load(); void video.play().catch(() => {}); } }, 0);
  }

  subtitleLoaded(): void {
    const track = this.torrentVideo?.nativeElement.textTracks[0];
    if (!track) return;
    track.mode = this.subtitlesEnabled() ? 'showing' : 'hidden';
    if (track.cues?.length) {
      for (const cue of Array.from(track.cues)) {
        if (cue instanceof VTTCue) { cue.snapToLines = true; cue.line = -3; }
      }
      this.subtitlesAvailable.set(true); this.subtitleError.set(false);
    }
  }

  toggleSubtitles(): void {
    this.subtitlesEnabled.update(value => !value);
    const tracks = this.torrentVideo?.nativeElement.textTracks;
    if (tracks?.length) tracks[0].mode = this.subtitlesEnabled() ? 'showing' : 'disabled';
  }

  fullscreen(): void { if (document.fullscreenElement) { void document.exitFullscreen(); } else { void this.playerShell?.nativeElement.requestFullscreen?.(); } }

  skip(seconds: number): void {
    if (this.selectedTorrent()) { this.seekTorrent(String(Math.max(0, this.torrentPosition() + seconds))); return; }
    const video = this.directVideo?.nativeElement;
    if (video) video.currentTime = Math.max(0, Math.min(Number.isFinite(video.duration) ? video.duration : Infinity, video.currentTime + seconds));
  }

  changeEpisode(delta: number): void {
    const next = Math.max(1, this.episodeNumber() + delta);
    if (next !== this.episodeNumber()) { this.episodeNumber.set(next); this.searchSources(); }
  }
}
