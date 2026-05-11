"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import verifiedData from "@/data/verified.json";
import { cn } from "@/app/utils/cn";

const ITEMS_PER_PAGE = 10;

const COLUMN_HEADERS = ["Player", "XP", "Country"];

interface Player {
  name: string;
  power: number;
  country?: string;
}

const allPlayersSorted = ((verifiedData.players as Player[]) ?? [])
  .map((p) => ({
    ...p,
    xp: p.power,
  }))
  .sort((a, b) => b.xp - a.xp);

const playerRanks = new Map(allPlayersSorted.map((p, i) => [p.name, i + 1]));

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPlayers = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return allPlayersSorted.filter((player) => {
      return (
        player.name.toLowerCase().includes(query) ||
        String(player.xp).includes(query) ||
        (player.country?.toLowerCase().includes(query) ?? false)
      );
    });
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);

  const currentPlayers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlayers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPlayers, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 gap-6 sm:gap-12">
      <div className="w-full max-w-2xl sticky top-4 sm:top-8 z-10">
        <input
          type="text"
          placeholder="Search Player, XP, Country..."
          className="w-full bg-search-bg text-black/60 text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg outline-none placeholder:text-black/40"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-12 py-5 sm:py-8">
          {COLUMN_HEADERS.map((header) => (
            <div key={header} className="pill">
              {header}
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          {currentPlayers.map((player) => {
            const rank = playerRanks.get(player.name)!;

            return (
              <div
                key={player.name}
                className={cn(
                  "flex items-center justify-between px-4 sm:px-12 py-3 sm:py-5 transition-colors",
                  rank === 1 && "bg-rank-gold text-black/80",
                  rank === 2 && "bg-rank-silver text-black/80",
                  rank === 3 && "bg-rank-bronze text-black/80",
                  rank > 3 && "bg-white text-black/70 border-b border-gray-100 last:border-0"
                )}
              >
                <div className="flex-1 flex items-center gap-2 sm:gap-4">
                  <span
                    className={cn(
                      "flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full font-bold text-xs sm:text-sm shrink-0 border-2 border-current/10",
                      rank === 1 && "bg-yellow-800/20 text-yellow-900",
                      rank === 2 && "bg-gray-700/20 text-gray-800",
                      rank === 3 && "bg-amber-800/20 text-amber-950",
                      rank > 3 && "bg-gray-100 text-gray-500"
                    )}
                  >
                    #{rank}
                  </span>
                  <span className="font-medium truncate text-sm sm:text-base">{player.name}</span>
                </div>
                <div className="flex-1 text-center font-bold font-mono text-base sm:text-lg">{player.xp}</div>
                <div className="flex-1 text-right text-xs sm:text-sm italic opacity-80">{player.country ?? "--"}</div>
              </div>
            );
          })}

          {currentPlayers.length === 0 && (
            <div className="py-20 text-center text-gray-400 text-xl font-medium">
              No players found...
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 items-center pb-8">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="pagination-btn"
          aria-label="Previous Page"
        >
          <ChevronLeft size={32} strokeWidth={3} />
        </button>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="pagination-btn"
          aria-label="Next Page"
        >
          <ChevronRight size={32} strokeWidth={3} />
        </button>
      </div>
    </main>
  );
}
