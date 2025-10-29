import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// Import our components
import { SongCardComponent } from './components/song-card/song-card.component';
import { PlayerControlsComponent } from './components/player-controls/player-controls.component';

// Import our pipes
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SortSongsPipe } from './pipes/sort-songs.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

// Import our services and data
import { AudioService } from './services/audio.service';
import { Song, Playlist } from './models/song.model'; // ✅ FIXED: Import types
import { MOCK_SONGS, MOCK_PLAYLISTS } from './data/mock-songs'; // ✅ FIXED: Both exports exist now

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SongCardComponent,
    PlayerControlsComponent,
    SearchFilterPipe,
    SortSongsPipe,
    TimeAgoPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // Component state
  songs: Song[] = [];
  playlists: Playlist[] = []; // ✅ FIXED: Add type annotation
  currentSong: Song | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 70;

  // UI state
  searchText: string = '';
  sortField: 'title' | 'artist' | 'duration' | 'addedDate' | 'plays' | 'likes' = 'title';
  sortOrder: 'asc' | 'desc' = 'asc';
  activeView: 'songs' | 'playlists' = 'songs';

  // RxJS subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.songs = MOCK_SONGS;
    this.playlists = MOCK_PLAYLISTS; // ✅ FIXED: Initialize playlists
    this.setupAudioSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setupAudioSubscriptions(): void {
    // Listen for current song changes
    this.subscriptions.add(
      this.audioService.currentSong$.subscribe(song => {
        this.currentSong = song;
        if (song) {
          this.duration = this.audioService.getDuration();
        }
      })
    );

    // Listen for play/pause state changes
    this.subscriptions.add(
      this.audioService.isPlaying$.subscribe(playing => {
        this.isPlaying = playing;
      })
    );

    // Listen for current time updates
    this.subscriptions.add(
      this.audioService.currentTime$.subscribe(time => {
        this.currentTime = time;
      })
    );

    // Listen for volume changes
    this.subscriptions.add(
      this.audioService.volume$.subscribe(volume => {
        this.volume = volume;
      })
    );
  }

  // Event handlers for song actions
  onPlaySong(song: Song): void {
    this.audioService.playSong(song);
  }

  onPauseSong(): void {
    this.audioService.pauseSong();
  }

  onPlayPause(): void {
    this.audioService.togglePlayPause();
  }

  onNextSong(): void {
    if (this.currentSong) {
      this.audioService.nextSong(this.songs, this.currentSong);
    }
  }

  onPreviousSong(): void {
    if (this.currentSong) {
      this.audioService.previousSong(this.songs, this.currentSong);
    }
  }

  onSeek(time: number): void {
    this.audioService.seekTo(time);
  }

  onVolumeChange(volume: number): void {
    this.audioService.setVolume(volume);
  }

  onAddToPlaylist(song: Song): void {
    console.log('Adding to playlist:', song.title);
    alert(`"${song.title}" added to playlist!`);
  }

  // UI handlers
  onSortChange(field: typeof this.sortField): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  }

  onViewChange(view: 'songs' | 'playlists'): void {
    this.activeView = view;
  }

  // Helper method to check if a song is currently playing
  isCurrentSong(song: Song): boolean {
    return this.currentSong?.id === song.id;
  }

  // Helper to get sort icon
  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'fas fa-sort';
    return this.sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  }
}