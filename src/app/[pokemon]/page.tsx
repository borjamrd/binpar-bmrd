/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";
import Abilities from "@/components/Abilities";
import Evolutions from "@/components/Evolutions";
import Loading from "@/components/Loading";
import { PageTransitionLayout } from "@/components/PageTransitionsLayout";
import PokeballSVG from "@/components/Pokeball";
import Stats from "@/components/Stats";
import Types from "@/components/Types";
import { useGlobalContext } from "@/context/Global";
import { type Pokemon, type TYPE } from "@/models/models";
import { colorSVGvariants, colorVariants, shadowVariants } from "@/utils/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";

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
  const router = useRouter()
  return (
    <PageTransitionLayout>
      <main className="p-4 flex items-center justify-center w-full h-screen">

        {!loading && pokemonItem ? (
          <div className={`flex flex-col items-center justify-center rounded-2xl bg-white lg:min-w-64 relative overflow-hidden z-0 ${color && shadowVariants[color]}`}>
            <button onClick={() => router.back()} className="flex gap-2 items-center top-5 left-5 absolute z-20 bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full shadow-md transition duration-300 ease-in-out">
              <IoArrowBack />
              {/* <span>Back</span> */}
            </button>

            <div



              style={{ clipPath: 'ellipse(100% 100% at 50% 0%)', backgroundColor: color && colorSVGvariants[color] }} className={`flex flex-col items-center h-40 lg:h-72 w-full rounded-t-2xl `}>

              <PokeballSVG />
              <h1 className="text-4xl lg:mt-10 mt-5 text-white font-bold mb-2 capitalize">{pokemonItem.name}</h1>
              <Types types={pokemonItem.types} />

            </div>
            {pokemonItem.sprites?.other?.dream_world.front_default && (<Image
              width={250}
              height={250}
              src={pokemonItem.sprites?.other?.dream_world.front_default}
              alt={pokemonItem.name}
              className="absolute top-20  lg:top-28 lg:w-56 w-28 h-28 lg:h-56 mb-4 z-10"
            />)}

            <div className="flex flex-col justify-center mb-4 lg:p-5 p-2">

              <Abilities abilities={pokemonItem.abilities} />
              <div className="flex flex-wrap justify-center mb-2">

              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-center lg:gap-8 gap-4 mb-1 font-semibold  border-slate-500 text-sm whitespace-nowrap text-gray-600">
                  <div className="flex flex-col items-center">
                    <p>{pokemonItem.height}</p>
                    <p className="text-xs">Height</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>{pokemonItem.weight}</p>
                    <p className="text-xs">Weight</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>{pokemonItem.base_experience}</p>
                    <p className="text-xs">Base experience</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>{pokemonItem.capture_rate}</p>
                    <p className="text-xs">Capture rate</p>
                  </div>
                </div>

                <Stats stats={pokemonItem.stats} />
              </div>
              <div className="flex justify-center">
                {pokemonItem?.evolves_from_species && (
                  <Evolutions flex="row"
                    evolutions={pokemonItem?.evolves_from_species}
                  />
                )}
              </div>
              <div className="flex items-center gap-2 mx-auto backdrop-blur-sm px-2 py-1 bg-gray-400 bg-opacity-40 text-white font-semibold rounded-xl">
                <p >#{pokemonItem.id}</p>  <p>{pokemonItem.generation?.name}</p>
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
