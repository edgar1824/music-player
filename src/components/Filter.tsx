import { useAppContext } from "contexts";
import { FC, FormEvent, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";

// Filters songs by artistName
export const Filter: FC = () => {
  const { searchByArtistName, setSearch, search } = useAppContext();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchByArtistName(search);
  };

  useEffect(() => {
    searchByArtistName(search);
  }, [search]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl overflow-hidden w-[200px]"
    >
      <button
        type="submit"
        className="absolute top-1/2 left-3 -translate-y-1/2"
      >
        <IoSearchOutline />
      </button>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9 pr-2 py-1 w-full outline-none"
        placeholder="Filter"
        type="text"
      />
    </form>
  );
};
