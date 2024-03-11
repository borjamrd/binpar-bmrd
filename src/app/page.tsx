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
import Link from "next/link";
import { useState, ReactNode } from "react";

export default function HomePage() {

  const { allPokemonData, realTimeSearch, searchResults, loading, next } =
    useGlobalContext();

  const [search, setSearch] = useState("");

  const handleChange = (e: TYPE) => {
    setSearch(e.target.value);
    realTimeSearch(search);
  };

  const handleSearch = (e: TYPE) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const displaySearchedPokemon = (): ReactNode => {
    return searchResults.map((pokemon: Pokemon) => {
      return (
        <Link
          href={pokemon.name}
          className="px-2 py-0 text-lg"
          key={pokemon.name}
        >
          {pokemon.name?.slice(0, 1)?.toUpperCase() + pokemon.name?.slice(1)}
        </Link>
      );
    });
  };
  return (
    <PageTransitionLayout>
      <main className="flex flex-col justify-between items-center p-10 min-h-screen">
        <>
          <form

            className="flex justify-center items-center mb-4 relative"
            onSubmit={handleSearch}
          >
            <div>
              <input
                className="px-4 py-5 bg-white border-slate-600 rounded shadow "
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Filtra pokemons por nombre"
              />
            </div>
          </form>
          {loading || (allPokemonData.length === 0 && <Loading />)}
          {search && searchResults?.length > 0 && (
            <div className="absolute h-56 w-56 top-1/4 left-1/2 overflow-auto transform translate-x-1/2 z-10 px-4 py-5 rounded bg-white shadow flex flex-col">
              {displaySearchedPokemon()}
            </div>
          )}
          <div className="grid grid-cols-4 grid-flow-row sm:max-w-[350] gap-5">
            {allPokemonData.map((pokemon: Pokemon) => {
              return <PokemonCard key={pokemon.id} pokemon={pokemon} />;;
            })}
          </div>
          <div className="next">
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
