import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { IContext, ISong } from "types";

// App main context
export const convertFileToAudio = (file: File) => {
  const audio = new Audio();
  audio.src = URL.createObjectURL(file);
  return audio;
};

const Context = createContext<IContext>(null!);

export const useAppContext = () => useContext(Context);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [queue, setQueue] = useState<ISong[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const addSong = (
    song: Pick<ISong, "file" | "songName" | "trackNumber" | "artistName">,
    time = 1000
  ) =>
    new Promise((res) => {
      setLoading(true);
      setTimeout(() => {
        setSongs((p) => [
          ...p,
          {
            ...song,
            audio: convertFileToAudio(song.file),
            isPlaying: false,
            like: false,
            show: song.artistName
              ?.toLocaleLowerCase()
              ?.includes(search.toLocaleLowerCase()),
          },
        ]);
        setLoading(false);
        res(null);
      }, time);
    });

  const togglePlaying = (trackNumber: number, type: "stop" | "play") => {
    setSongs((p) =>
      p.map((s) => ({
        ...s,
        isPlaying:
          trackNumber === s.trackNumber
            ? { stop: false, play: true }[type]
            : false,
      }))
    );
    if (type === "play") {
      songs
        .find((s) => s.trackNumber === trackNumber)
        ?.audio.addEventListener("ended", () => {
          resetSong(trackNumber);
          if (songs.find(() => trackNumber + 1))
            togglePlaying(trackNumber + 1, "play");
        });
    }
  };
  const resetSong = (trackNumber: number) => {
    const isPlaying = songs.find(
      (s) => s.trackNumber === trackNumber
    )?.isPlaying;
    setSongs((p) =>
      p.map((s) => {
        if (s.trackNumber === trackNumber) {
          s.audio?.pause();
          return {
            ...s,
            isPlaying: false,
            audio: convertFileToAudio(s.file),
          };
        }
        return s;
      })
    );
    if (isPlaying) {
      setTimeout(() => {
        togglePlaying(trackNumber, "play");
      }, 0);
    }
  };

  const searchByArtistName = (text: string) => {
    setSongs((p) =>
      p.map((s) => ({
        ...s,
        show: s.artistName
          ?.toLocaleLowerCase()
          ?.includes(text.toLocaleLowerCase()),
      }))
    );
  };

  return (
    <Context.Provider
      value={{
        songs,
        addSong,
        loading,
        setLoading,
        togglePlaying,
        resetSong,
        setSongs,
        searchByArtistName,
        search,
        setSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
