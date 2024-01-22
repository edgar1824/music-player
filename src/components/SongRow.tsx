import { useAppContext } from "contexts";
import { FC, useEffect } from "react";
import { GrPowerReset } from "react-icons/gr";
import { IoMdPlay } from "react-icons/io";
import { IoStop } from "react-icons/io5";
import { ISong } from "../types";

interface Props extends ISong {}
// Single song in a row
export const SongRow: FC<Props> = ({
  songName,
  trackNumber,
  artistName,
  isPlaying,
  audio,
}) => {
  const { togglePlaying, resetSong } = useAppContext();

  const playClickHanlder = () => {
    if (!isPlaying) {
      togglePlaying(trackNumber, "play");
    } else togglePlaying(trackNumber, "stop");
  };

  useEffect(() => {
    if (isPlaying) audio?.play();
    else audio?.pause();
  }, [isPlaying]);

  return (
    <tr className="py-3 px-2 border-b-2 border-[var(--gray)] hover:bg-gray-300/30 duration-300">
      <td colSpan={1} className="px-2 py-3">
        <div className="flex items-center gap-2">
          <div onClick={playClickHanlder}>
            {isPlaying ? (
              <IoStop className="cursor-pointer" />
            ) : (
              <IoMdPlay className="cursor-pointer" />
            )}
          </div>
          <GrPowerReset
            className="cursor-pointer"
            onClick={() => resetSong(trackNumber)}
          />
        </div>
      </td>
      <td colSpan={2} className="px-2 py-3">
        {songName}
      </td>
      <td colSpan={2} className="px-2 py-3">
        {artistName}
      </td>
      <td colSpan={1} className="px-2 py-3">
        {trackNumber}
      </td>
    </tr>
  );
};
