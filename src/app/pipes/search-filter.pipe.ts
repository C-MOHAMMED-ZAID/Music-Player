import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../models/song.model';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(songs: Song[], searchText: string): Song[] {
    if (!songs) return [];
    if (!searchText) return songs;
    
    searchText = searchText.toLowerCase();
    
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchText) ||
      song.artist.toLowerCase().includes(searchText) ||
      song.album.toLowerCase().includes(searchText) ||
      song.genre.toLowerCase().includes(searchText)
    );
  }
}