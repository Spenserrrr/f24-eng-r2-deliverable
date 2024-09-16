"use client"; // Client-side component
import type { Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];

import { useRouter } from "next/navigation";
import { useState } from "react";
import SpeciesCard from "./species-card";

export default function SearchSpecies({
  species,
  searchQuery,
  userId,
}: {
  species: Species[];
  searchQuery: string;
  userId: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState<string>(searchQuery); // Initialize with existing search query (if any)

  // Handle the search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Update the URL with the new search query, triggering the server-side component to re-fetch
    router.push(`?search=${encodeURIComponent(value)}`);
  };

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search species..."
        value={search}
        onChange={handleSearchChange}
        className="mb-4 w-full rounded border p-2"
      />

      {/* Render filtered or all species */}
      <div className="flex flex-wrap justify-center">
        {species.length > 0 ? (
          species.map((species) => <SpeciesCard key={species.id} species={species} userId={userId} />)
        ) : (
          <p>No species found</p>
        )}
      </div>
    </div>
  );
}
