import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../models/song.model';

type SortField = 'title' | 'artist' | 'duration' | 'addedDate' | 'plays' | 'likes';
type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'sortSongs',
  standalone: true
})
export class SortSongsPipe implements PipeTransform {
  transform(songs: Song[], field: SortField, order: SortOrder = 'asc'): Song[] {
    if (!songs) return [];
    
    return [...songs].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}