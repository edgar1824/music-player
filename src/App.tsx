import {
  SongList,
  AddAllButton,
  MusicUploadForm,
  PlayAllButton,
  Filter,
} from "components";
import { AppProvider } from "contexts";

function App() {
  return (
    <AppProvider>
      <div className="mx-auto my-10 w-full max-w-[1000px] px-5 flex flex-col gap-5">
        <div className="px-3 py-2 flex items-center justify-between gap-3 bg-[var(--gray)] flex-wrap">
          <div className="flex items-center gap-3">
            <PlayAllButton />
            <AddAllButton />
          </div>
          <Filter />
        </div>
        <SongList />
        <MusicUploadForm />
      </div>
    </AppProvider>
  );
}

export default App;
