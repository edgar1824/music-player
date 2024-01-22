import { useAppContext } from "contexts";
import { FC } from "react";
import { Loading } from "./Loading";
import { SongRow } from "./SongRow";

// All song list
export const SongList: FC = () => {
  const { loading, songs } = useAppContext();
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-[var(--gray)]">
          <tr>
            <th colSpan={1} className="px-2 py-3 border-r border-white"></th>
            <th colSpan={2} className="px-2 py-3 border-r border-white">
              Song Name
            </th>
            <th colSpan={2} className="px-2 py-3 border-r border-white">
              Artist Name
            </th>
            <th colSpan={1} className="px-2 py-3">
              Track
            </th>
            <th colSpan={1} className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {!!songs?.length
            ? songs
                .filter((s) => s.show)
                .map((song, index) => <SongRow key={index} {...song} />)
            : !loading && (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    Upload song!
                  </td>
                </tr>
              )}
        </tbody>
      </table>
      {loading && <Loading />}
    </div>
  );
};
