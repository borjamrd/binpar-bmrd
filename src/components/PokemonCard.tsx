/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import Image from "next/image";
import Link from "next/link";
import Types from "./Types";

import { type Pokemon } from "@/models/models";
import { colorVariants, firstLetterToUpperCase, shadowVariants } from "@/utils/utils";
import Evolutions from "./Evolutions";
export default function PokemonCard({ pokemon, color }: { pokemon: Pokemon, color?: string }) {



  return (
    <Link href={pokemon.name} className={`group hover:-translate-x-1 hover:-translate-y-1 duration-300 h-44 rounded-xl ${color && shadowVariants[color]} shadow lg:min-w-64 relative ${color && colorVariants[color]} z-0`}>
      <div className="p-2 w-full h-full object-contain rounded relative flex">
        {pokemon.sprites?.other?.dream_world.front_default && (<Image
          src={pokemon.sprites?.other?.dream_world.front_default}
          alt={pokemon.name}
          className="lg:-bottom-5 lg:-right-5 -bottom-2 -right-2 absolute min-w-11 max-w-24 max-h-24  lg:min-h-20 lg:min-w-20 lg:max-h-40 lg:max-w-40  group-hover:scale-125 duration-300 z-50"
          width={120}
          height={120}
        />)}

        <p className="absolute bottom-0 left-0 p-2 bg-gray-400 bg-opacity-40 text-white font-semibold text-lg rounded-xl">#{pokemon.id}</p>


        <div className="px-4">
          <h3 className="text-slate-100">{firstLetterToUpperCase(pokemon.name)}</h3>
          <Types types={pokemon.types} />
          {pokemon?.evolves_from_species && (
            <Evolutions evolutions={pokemon?.evolves_from_species} />
          )}
        </div>
      </div>

    </Link>
  );
}
