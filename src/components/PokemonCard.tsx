/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import Image from "next/image";
import Link from "next/link";
import Types from "./Types";

import { type Pokemon } from "@/models/models";
import { colorSVGvariants, shadowVariants } from "@/utils/utils";
export default function PokemonCard({ pokemon, color }: { pokemon: Pokemon, color?: string }) {


  // const color = pokemon?.types[0]?.type.name



  return (
    <Link href={pokemon.name} style={{
      backgroundColor: color && colorSVGvariants[color]
    }} className={`group hover:-translate-x-1 hover:-translate-y-1 duration-300 h-44 rounded-xl ${color && shadowVariants[color]} shadow lg:min-w-64 relative  z-0`}>
      <div className="p-2 w-full h-full object-contain rounded relative flex">
        {pokemon.sprites?.other?.dream_world.front_default && (<Image
          src={pokemon.sprites?.other?.dream_world.front_default}
          alt={pokemon.name}
          className="lg:-bottom-5 lg:-right-5 -bottom-2 -right-2 absolute min-w-11 max-w-24 max-h-24  lg:min-h-20 lg:min-w-20 lg:max-h-40 lg:max-w-40  group-hover:scale-125 duration-300 z-50"
          width={120}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzg6tBwAEIAGskJxlQwAAAABJRU5ErkJggg=="
          height={120}
        />)}
        <div className="absolute flex items-center gap-2 lg:-bottom-3 bottom-0 left-0 lg:-left-3 backdrop-blur-sm px-2 py-1 bg-gray-400 bg-opacity-40 text-white font-semibold rounded-xl">
          <p >#{pokemon.id}</p>  <p className="lg:block hidden">{pokemon.generation?.name}</p>
        </div>

        <div className="px-4">
          <h3 className="text-slate-100 group-hover:underline group-hover:underline-offset-4 no-underline capitalize decoration-2">{pokemon.name}</h3>
          <Types types={pokemon.types} />

          {/* <Evolutions flex="col" pokemon={pokemon} /> */}


        </div>
      </div>

    </Link>
  );
}
