import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Song } from '../../models/song.model'; // ✅ FIXED: Import Song type
import { DurationFormatPipe } from '../../pipes/duration-format.pipe';
import { WaveAnimationDirective } from '../../directives/wave-animation.directive';
import { RippleEffectDirective } from '../../directives/ripple-effect.directive';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [
    CommonModule,
    DurationFormatPipe,
    WaveAnimationDirective,
    RippleEffectDirective
  ],
  templateUrl: './player-controls.component.html'
})
export class PlayerControlsComponent implements OnInit, OnDestroy {
  // Inputs from parent component
  @Input() currentSong: Song | null = null;
  @Input() isPlaying: boolean = false;
  @Input() currentTime: number = 0;
  @Input() duration: number = 0;
  @Input() volume: number = 70;

  // Outputs to parent component
  @Output() playPause = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() seek = new EventEmitter<number>();
  @Output() volumeChange = new EventEmitter<number>();

  // Local state for progress bar dragging
  private isSeeking: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    // Cleanup logic
  }

  // Toggle play/pause
  onPlayPause(): void {
    this.playPause.emit();
  }

  // Go to next song
  onNext(): void {
    this.next.emit();
  }

  // Go to previous song
  onPrevious(): void {
    this.previous.emit();
  }

  // When user starts dragging progress bar
  onSeekStart(event: MouseEvent): void {
    this.isSeeking = true;
    this.updateSeekPosition(event);
  }

  // When user is dragging progress bar
  onSeekMove(event: MouseEvent): void {
    if (this.isSeeking) {
      this.updateSeekPosition(event);
    }
  }

  // When user stops dragging progress bar
  onSeekEnd(event: MouseEvent): void {
    if (this.isSeeking) {
      this.updateSeekPosition(event);
      this.isSeeking = false;
    }
  }

  // Calculate seek position based on mouse click
  private updateSeekPosition(event: MouseEvent): void {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const newTime = percent * this.duration;
    
    // Emit the new time (clamped between 0 and duration)
    this.seek.emit(Math.max(0, Math.min(newTime, this.duration)));
  }

  // Handle volume change from slider
  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.volumeChange.emit(Number(input.value));
  }

  // Calculate progress percentage for CSS
  getProgressPercentage(): number {
    if (this.duration === 0) return 0;
    return (this.currentTime / this.duration) * 100;
  }
}