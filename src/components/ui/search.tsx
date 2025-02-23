import { Input } from "./input";

function Search() {
  return (
    <div className="relative flex-1 max-w-md">
      <Input
        type="search"
        placeholder="Search"
        className="w-full pl-10 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-zinc-700"
      />
    </div>
  );
}

export default Search;
