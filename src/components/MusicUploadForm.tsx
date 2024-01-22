import { useAppContext } from "contexts";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "./Button";


// Form for uploading new song
export const MusicUploadForm = () => {
  const [artistName, setArtistName] = useState("");
  const [file, setFile] = useState<File>(null!);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({
    file: "",
    artistName: "",
  });

  const { addSong, songs } = useAppContext();

  const selectFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target?.files?.[0]) {
      console.log(e.target?.files?.[0]);
      let interval: NodeJS.Timer;
      interval = setInterval(() => {
        setProgress((p) => {
          const newProgress = p + 10;
          if (newProgress > 100) {
            clearInterval(interval);
            setFile(e.target?.files?.[0]!);
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      artistName: !artistName ? "Please mention artists name" : "",
      file: !file ? "Please upload song (file)" : "",
    });
    if (!file || !artistName) return;
    if (!file.type.includes("audio/")) {
      setErrors((p) => ({ ...p, file: "Please select audio file" }));
      return;
    }

    addSong({
      file,
      songName: file.name,
      trackNumber: songs.length + 1,
      artistName,
    }).then(() => {
      setFile(null!);
      setArtistName("");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {!!file && (
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <span>{file.name}</span>
            <FaTimes
              className="cursor-pointer"
              onClick={() => setFile(null!)}
            />
          </div>
        </div>
      )}
      {progress > 0 && (
        <div className="flex items-center gap-2">
          <progress
            className="h-4 mt-1 rounded overflow-hidden"
            value={progress}
            max={100}
          />
          <p>Uploading...</p>
        </div>
      )}

      <div className="flex gap-4 items-center">
        <label
          htmlFor="file"
          className="cursor-pointer flex items-center gap-8 w-fit min-w-32 h-full"
        >
          <Button type="button" className="pointer-events-none w-full">
            Upload
          </Button>
          <input
            onChange={selectFileHandler}
            name="file"
            type="file"
            id="file"
            hidden
            accept=".mp3,.wav"
          />
        </label>

        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Artists name"
          className="outline-none border border-black px-4 py-2 rounded w-full"
        />
      </div>

      <Button type="submit">Add Song to List</Button>
      <div className="flex flex-col items-center">
        {!!errors.file && <span className="text-[red]">{errors.file}</span>}
        {!!errors.artistName && (
          <span className="text-[red]">{errors.artistName}</span>
        )}
      </div>
    </form>
  );
};
