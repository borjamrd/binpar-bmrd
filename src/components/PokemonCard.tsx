/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import Image from "next/image";
import Link from "next/link";
import Types from "./Types";

import { type Pokemon } from "@/models/models";
import { firstLetterToUpperCase } from "@/utils/utils";
import Evolutions from "./Evolutions";
export default function PokemonCard({ pokemon, color }: { pokemon: Pokemon, color?: string }) {


  const colorVariants: Record<string, string> = {
    'bug': 'bg-[#aedf78]',
    'water': 'bg-[#43ccff]',
    'grass': 'bg-[#00ca91]',
    'fire': 'bg-[#e95c4d]',
    'fighting': 'bg-[#e95c4d]',
    'normal': 'bg-[#a5a5a5]',
    'electric': 'bg-[#F7D02C]',
    'ice': 'bg-[#96D9D6]',
    'poison': 'bg-[#A33EA1]',
    'ground': 'bg-[#E2BF65]',
    'flying': 'bg-[#A98FF3]',
    'psychic': 'bg-[#F95587]',
    'rock': 'bg-[#B6A136]',
    'ghost': 'bg-[#735797]',
    'dragon': 'bg-[#6F35FC]',
    'dark': 'bg-[#705746]',
    'steel': 'bg-[#B7B7CE]',
    'fairy': 'bg-[#D685AD]',
  }
  const shadowVariants: Record<string, string> = {
    'bug': 'shadow-[#aedf78]',
    'water': 'shadow-[#43ccff]',
    'grass': 'shadow-[#00ca91]',
    'fire': 'shadow-[#e95c4d]',
    'normal': 'shadow-[#a5a5a5]',
    'electric': 'shadow-[#F7D02C]',
    'fighting': 'shadow-[#e95c4d]',
    'ice': 'shadow-[#96D9D6]',
    'poison': 'shadow-[#A33EA1]',
    'ground': 'shadow-[#E2BF65]',
    'flying': 'shadow-[#A98FF3]',
    'psychic': 'shadow-[#F95587]',
    'rock': 'shadow-[#B6A136]',
    'ghost': 'shadow-[#735797]',
    'dragon': 'shadow-[#6F35FC]',
    'dark': 'shadow-[#705746]',
    'steel': 'shadow-[#B7B7CE]',
    'fairy': 'shadow-[#D685AD]',
  }
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
