import React from "react";
import { Card } from "./card";
import { Input } from "./input";
import { Search } from "lucide-react";
import { Search as Searchh } from "lucide-react";

function Search() {
  return (
    <div className="relative flex-1 max-w-md">
      <Searchh className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400 !py-4" />
      <Input
        type="search"
        placeholder="Search"
        className="w-full pl-10 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-zinc-700"
      />
    </div>
  );
}

export default Search;
