import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../models/song.model'; // ✅ FIXED: Import Song type
import { DurationFormatPipe } from '../../pipes/duration-format.pipe';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { HoverEffectDirective } from '../../directives/hover-effect.directive';
import { RippleEffectDirective } from '../../directives/ripple-effect.directive';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [
    CommonModule,
    DurationFormatPipe,
    FileSizePipe,
    TimeAgoPipe,
    HoverEffectDirective,
    RippleEffectDirective
  ],
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent {
  // Inputs from parent component
  @Input() song!: Song;
  @Input() isPlaying: boolean = false;
  @Input() isCurrentSong: boolean = false;

  // Outputs to parent component
  @Output() play = new EventEmitter<Song>();
  @Output() pause = new EventEmitter<void>();
  @Output() addToPlaylist = new EventEmitter<Song>();

  // Method called when play button is clicked
  onPlayClick(): void {
    if (this.isPlaying) {
      this.pause.emit();
    } else {
      this.play.emit(this.song);
    }
  }

  // Method called when add to playlist is clicked
  onAddToPlaylist(): void {
    this.addToPlaylist.emit(this.song);
  }
}