/* eslint-disable @typescript-eslint/no-floating-promises */
"use client"

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Loading from "@/components/Loading";
import { PageTransitionLayout } from "@/components/PageTransitionsLayout";
import PokemonCard from "@/components/PokemonCard";
import { useGlobalContext } from "@/context/Global";
import { Pokemon, TYPE } from "@/models/models";
import { removeHyphens } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ReactNode, useEffect, useRef } from "react";

export default function HomePage() {

  const { allPokemonData, realTimeSearch, searchResults, loading, next } =
    useGlobalContext();

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const router = useRouter()
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedItem(0);
      setSelectedIdx((prevIdx) => Math.min(prevIdx + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((prevIdx) => Math.max(prevIdx - 1, 0));
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIdx !== -1) {
        router.push(searchResults[selectedIdx].name);
      }
    }

  };
  const handleChange = (e: TYPE) => {
    setSearch(e.target.value);
    realTimeSearch(search);
  };

  const handleSearch = (e: TYPE) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  useEffect(() => {
    if (selectedItem === 0 && searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, [selectedItem]);

  const displaySearchedPokemon = (): ReactNode => {
    return searchResults.map((pokemon: Pokemon, index: number) => {
      return (
        <Link
          href={pokemon.name}
          className={`block px-2 py-1 text-lg hover:bg-slate-300 capitalize ${index === selectedIdx ? 'bg-blue-200' : ''}`}
          key={pokemon.name}
        >
          {removeHyphens(pokemon.name)}
        </Link>
      );
    });
  };
  return (
    <PageTransitionLayout>
      <main className="flex flex-col justify-between items-center lg:p-10 p-3 min-h-screen">
        <>
          <form

            className="flex justify-center items-center mb-4 relative"
            onSubmit={handleSearch}
          >
            <div className="relative">
              <input
                ref={searchInputRef}
                className="px-4 py-5 bg-white border-slate-600 rounded shadow "
                type="text"
                value={search}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Filter pokemon by name"
              />
            </div>
          </form>
          {loading || (allPokemonData.length === 0 && <Loading />)}
          {search && searchResults?.length > 0 && (
            <div className="absolute h-56 w-56 top-28 left-1/2 overflow-auto p-0.5 transform -translate-x-1/2 z-10 rounded bg-white shadow flex flex-col scrollbar-thin scrollbar-thumb-gray-300">
              {displaySearchedPokemon()}
            </div>
          )}
          <div className="grid lg:grid-cols-4 grid-flow-row lg:gap-10 gap-3 grid-cols-2">
            {allPokemonData.map((pokemon: Pokemon) => {
              return <PokemonCard key={pokemon.id} pokemon={pokemon} color={pokemon?.types[0]?.type.name} />;
            })}
          </div>
          <div className="mt-5">
            {!loading && allPokemonData.length > 0 ? (
              <div>
                <button className="flex justify-center items-center mt-4 p-4 bg-white border border-opacity-50 border-gray-200 rounded-lg shadow-md text-gray-700 cursor-pointer" onClick={next}>
                  Cargar más &darr;
                </button>
              </div>
            ) : (
              <div>
                <button className="flex justify-center items-center mt-4 p-4 bg-white border border-opacity-50 border-gray-200 rounded-lg shadow-md text-gray-700 cursor-pointer" disabled>
                  Cargando...
                </button>
              </div>
            )}
          </div>
        </>
      </main>
    </PageTransitionLayout>
  );
}
