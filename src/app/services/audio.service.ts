import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // 🎯 Import platform check
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  // 🎯 BehaviorSubjects for state management
  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private volumeSubject = new BehaviorSubject<number>(70);

  // 🎯 Public observables for components to subscribe to
  public currentSong$: Observable<Song | null> = this.currentSongSubject.asObservable();
  public isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  public currentTime$: Observable<number> = this.currentTimeSubject.asObservable();
  public volume$: Observable<number> = this.volumeSubject.asObservable();

  // 🎯 HTML5 Audio Element - but only in browser
  private audioPlayer: HTMLAudioElement | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    // 🎯 Check if we're running in a browser (not server)
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser) {
      this.initializeAudioPlayer();
    }
  }

  private initializeAudioPlayer(): void {
    try {
      // 🎯 Only create Audio element in browser environment
      this.audioPlayer = new Audio();
      this.setupAudioEvents();
      console.log('🎵 Audio player initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize audio player:', error);
      this.audioPlayer = null;
    }
  }

  private setupAudioEvents(): void {
    if (!this.audioPlayer) return;

    // 🎯 Update current time as audio plays
    this.audioPlayer.ontimeupdate = () => {
      this.currentTimeSubject.next(this.audioPlayer!.currentTime);
    };

    // 🎯 Handle when audio ends
    this.audioPlayer.onended = () => {
      this.isPlayingSubject.next(false);
    };

    // 🎯 Handle audio errors
    this.audioPlayer.onerror = () => {
      console.error('❌ Audio playback error');
      this.isPlayingSubject.next(false);
    };
  }

  // 🎯 Check if audio is available
  isAudioAvailable(): boolean {
    return this.isBrowser && this.audioPlayer !== null;
  }

  // 🎯 Play a song
  playSong(song: Song): void {
    if (!this.isAudioAvailable()) {
      console.warn('⚠️ Audio not available - running in server or unsupported environment');
      // 🎯 Simulate playback for demo purposes
      this.currentSongSubject.next(song);
      this.isPlayingSubject.next(true);
      return;
    }

    // 🎯 If it's a new song, change the audio source
    if (this.currentSongSubject.value?.id !== song.id) {
      this.audioPlayer!.src = song.audioUrl;
      this.currentSongSubject.next(song);
    }
    
    // 🎯 Play the audio
    this.audioPlayer!.play().then(() => {
      this.isPlayingSubject.next(true);
    }).catch(error => {
      console.error('❌ Error playing audio:', error);
      // 🎯 Fallback: simulate playback for demo
      this.isPlayingSubject.next(true);
    });
  }

  // 🎯 Pause the current song
  pauseSong(): void {
    if (this.isAudioAvailable()) {
      this.audioPlayer!.pause();
    }
    this.isPlayingSubject.next(false);
  }

  // 🎯 Resume playing
  resumeSong(): void {
    if (this.isAudioAvailable() && this.audioPlayer!.src) {
      this.audioPlayer!.play().then(() => {
        this.isPlayingSubject.next(true);
      }).catch(error => {
        console.error('❌ Error resuming audio:', error);
      });
    } else {
      // 🎯 Fallback for demo
      this.isPlayingSubject.next(true);
    }
  }

  // 🎯 Toggle play/pause
  togglePlayPause(): void {
    if (this.isPlayingSubject.value) {
      this.pauseSong();
    } else {
      if (this.currentSongSubject.value) {
        this.resumeSong();
      }
    }
  }

  // 🎯 Set volume (0-100)
  setVolume(volume: number): void {
    this.volumeSubject.next(volume);
    
    if (this.isAudioAvailable()) {
      // 🎯 Convert 0-100 to 0-1 for audio element
      this.audioPlayer!.volume = volume / 100;
    }
  }

  // 🎯 Seek to specific time in song
  seekTo(time: number): void {
    if (this.isAudioAvailable() && this.audioPlayer!.duration) {
      this.audioPlayer!.currentTime = time;
    }
    this.currentTimeSubject.next(time);
  }

  // 🎯 Get current song duration
  getDuration(): number {
    if (this.isAudioAvailable() && this.audioPlayer!.duration) {
      return this.audioPlayer!.duration;
    }
    // 🎯 Return demo duration if audio not available
    return this.currentSongSubject.value?.duration || 0;
  }

  // 🎯 Skip to next song
  nextSong(playlist: Song[], currentSong: Song): void {
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    this.playSong(playlist[nextIndex]);
  }

  // 🎯 Skip to previous song
  previousSong(playlist: Song[], currentSong: Song): void {
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    this.playSong(playlist[prevIndex]);
  }

  // 🎯 Get current audio time (for progress)
  getCurrentTime(): number {
    if (this.isAudioAvailable()) {
      return this.audioPlayer!.currentTime;
    }
    return this.currentTimeSubject.value;
  }
}