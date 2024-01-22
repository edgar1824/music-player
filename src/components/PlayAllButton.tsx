import { IoMdPlay } from "react-icons/io";
import { Button } from "./Button";
import { convertFileToAudio, useAppContext } from "contexts";

// Starts playlist from the first song
export const PlayAllButton = () => {
  const { togglePlaying, setSongs } = useAppContext();
  return (
    <Button
      onClick={() => {
        setSongs((p) =>
          p.map((s) => {
            s.audio?.pause();
            return {
              ...s,
              isPlaying: false,
              audio: convertFileToAudio(s.file),
            };
          })
        );
        setTimeout(() => {
          togglePlaying(1, "play");
        }, 0);
      }}
      className="flex items-center gap-3"
    >
      <IoMdPlay /> Play All
    </Button>
  );
};
