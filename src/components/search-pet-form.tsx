"use client";

import React from "react";
import { useSearchContext } from "@/lib/hooks";

export default function SearchPetForm() {
  const { searchQuery, handleChangeSearchQuery } = useSearchContext();

  return (
    <form className="h-full w-full">
      <input
        type="search"
        placeholder="Search pets"
        className="w-full rounded-sm bg-white/30 px-5 py-3 outline-none placeholder:text-white/70 hover:bg-white/10 focus:bg-white/20"
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}
