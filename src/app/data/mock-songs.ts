import { Song, Playlist } from '../models/song.model';

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 203, // 3:23 minutes
    fileSize: 8345678, // ~8MB
    genre: 'Synthwave',
    coverArt: 'https://picsum.photos/300/300?random=1',
    addedDate: new Date('2024-01-15'),
    plays: 1500000,
    likes: 120000,
    audioUrl: 'https://assets.codepen.io/4358584/17.1.wav'
  },
  {
    id: '2', 
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    fileSize: 7564321,
    genre: 'Pop',
    coverArt: 'https://picsum.photos/300/300?random=2',
    addedDate: new Date('2024-02-20'),
    plays: 980000,
    likes: 89000,
    audioUrl: 'https://assets.codepen.io/4358584/17.2.wav'
  },
  {
    id: '3',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    album: 'F*CK LOVE 3',
    duration: 141,
    fileSize: 5678901,
    genre: 'Pop',
    coverArt: 'https://picsum.photos/300/300?random=3',
    addedDate: new Date('2024-03-10'),
    plays: 1200000,
    likes: 110000,
    audioUrl: 'https://assets.codepen.io/4358584/17.3.wav'
  },
  {
    id: '4',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR', 
    duration: 178,
    fileSize: 7123456,
    genre: 'Pop Rock',
    coverArt: 'https://picsum.photos/300/300?random=4',
    addedDate: new Date('2024-01-28'),
    plays: 890000,
    likes: 78000,
    audioUrl: 'https://assets.codepen.io/4358584/17.4.wav'
  },
  {
    id: '5',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 238,
    fileSize: 9456789,
    genre: 'Indie Pop',
    coverArt: 'https://picsum.photos/300/300?random=5',
    addedDate: new Date('2024-02-05'),
    plays: 2100000,
    likes: 195000,
    audioUrl: 'https://assets.codepen.io/4358584/17.5.wav'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Chill Vibes',
    songs: [MOCK_SONGS[0], MOCK_SONGS[2]],
    coverArt: 'https://picsum.photos/400/200?random=6',
    createdDate: new Date('2024-01-01')
  },
  {
    id: 'p2', 
    name: 'Workout Mix',
    songs: [MOCK_SONGS[1], MOCK_SONGS[3], MOCK_SONGS[4]],
    coverArt: 'https://picsum.photos/400/200?random=7',
    createdDate: new Date('2024-02-15')
  }
];