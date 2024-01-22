export interface ISong {
  songName: string;
  artistName: string;
  trackNumber: number;
  file: File;

  audio: HTMLAudioElement;
  isPlaying: boolean;
  show: boolean;
}

export interface IContext {
  songs: ISong[];
  addSong: (
    song: Pick<ISong, "file" | "songName" | "trackNumber" | "artistName">,
    time?: number
  ) => Promise<unknown>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  togglePlaying: (trackNumber: number, type: "stop" | "play") => void;
  resetSong: (trackNumber: number) => void;
  setSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
  searchByArtistName: (text: string) => void;
}
