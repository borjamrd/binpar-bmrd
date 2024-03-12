/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";
import Abilities from "@/components/Abilities";
import Card from "@/components/Card";
import Evolutions from "@/components/Evolutions";
import Loading from "@/components/Loading";
import { PageTransitionLayout } from "@/components/PageTransitionsLayout";
import Stats from "@/components/Stats";
import Types from "@/components/Types";
import { useGlobalContext } from "@/context/Global";
import { type Pokemon, type TYPE } from "@/models/models";
import { colorVariants, shadowVariants } from "@/utils/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams();
  const {
    getPokemon,
    loading,
    pokemon: pokemonItem,
  }: {
    getPokemon: TYPE;
    loading: boolean;
    pokemon: Pokemon;
  } = useGlobalContext();

  useEffect(() => {
    if (params.pokemon) {
      getPokemon(params.pokemon);
    }
  }, [params.pokemon]);

  const color = pokemonItem?.types[0]?.type?.name

  return (
    <PageTransitionLayout>
      <main className="p-4 flex items-center justify-center w-full h-screen">

        {!loading && pokemonItem ? (
          <div className={`flex flex-col items-center justify-center min-w-96 rounded-2xl bg-white lg:min-w-64 relative z-0 ${color && shadowVariants[color]}`}>

            <div style={{ clipPath: 'ellipse(100% 100% at 50% 0%)' }} className={`flex flex-col items-center h-72 w-full rounded-t-2xl  ${color && colorVariants[color]}`}>
              <h1 className="text-4xl mt-10 text-white font-bold mb-2 capitalize">{pokemonItem.name}</h1>
              <Types types={pokemonItem.types} />

            </div>
            {pokemonItem.sprites?.other?.dream_world.front_default && (<Image
              width={250}
              height={250}
              src={pokemonItem.sprites?.other?.dream_world.front_default}
              alt={pokemonItem.name}
              className="absolute top-28 w-56 h-56 mb-4 z-10"
            />)}

            <div className="flex flex-col justify-center mb-4 p-5">

              <Abilities abilities={pokemonItem.abilities} />
              <div className="flex flex-wrap justify-center mb-4">

              </div>
              <div className="flex flex-col gap-2">
                <ul className="list-none mb-1 text-lg font-semibold whitespace-nowrap text-gray-600">
                  <li>Height: {pokemonItem.height}</li>
                  <li>Weight: {pokemonItem.weight}</li>
                  <li>Base Experience: {pokemonItem.base_experience}</li>
                  <li>Capture rate: {pokemonItem.capture_rate}</li>
                </ul>
                <div>
                  {pokemonItem?.evolves_from_species && (
                    <Evolutions
                      evolutions={pokemonItem?.evolves_from_species}
                    />
                  )}
                </div>
                <Stats stats={pokemonItem.stats} />
              </div>
            </div>



          </div>
        ) : (
          <Loading />
        )}

      </main>
    </PageTransitionLayout >
  );
}
