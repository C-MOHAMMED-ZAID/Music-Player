export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  fileSize: number; // in bytes
  genre: string;
  coverArt: string;
  addedDate: Date;
  plays: number;
  likes: number;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  coverArt: string;
  createdDate: Date;
}