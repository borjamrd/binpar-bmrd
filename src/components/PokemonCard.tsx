/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import Image from "next/image";
import Link from "next/link";
import Types from "./Types";

import { type Pokemon } from "@/models/models";
import { firstLetterToUpperCase } from "@/utils/utils";
import Evolutions from "./Evolutions";
export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link href={pokemon.name} className="img_section h-56 bg-gray-400 bg-opacity-40 rounded-xl relative min-w-56">
      <div className="p-10 w-full h-full object-contain rounded relative">
        {pokemon.sprites?.other?.dream_world.front_default && (<Image
          src={pokemon.sprites?.other?.dream_world.front_default}
          alt={pokemon.name}
          className="-mt-10 -ml-20 absolute"
          width={180}
          height={180}
        />)}

        <p className="absolute bottom-0 left-0 p-2 bg-gray-400 bg-opacity-40 text-white font-semibold text-lg rounded-xl">#{pokemon.id}</p>
      </div>
      <div className="px-4">
        <h3>{firstLetterToUpperCase(pokemon.name)}</h3>
        <Types types={pokemon.types} />
        {pokemon?.evolves_from_species && (
          <Evolutions evolutions={pokemon?.evolves_from_species} />
        )}
      </div>
    </Link>
  );
}
