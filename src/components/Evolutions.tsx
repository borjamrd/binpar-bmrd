/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Pokemon } from "@/models/models";
import Link from "next/link";
export default function Evolutions({
  pokemon,
  flex
}: {
  pokemon: Pokemon,
  flex: 'col' | 'row'

}) {

  if (!pokemon.evolves_from_species?.name) return
  return (
    <div className={`mb-4 flex-row flex gap-2 text-sm max-w-30ch text-gray-800 font-semibold rounded-xl`}>
      <p >Evolution from: </p>
      <Link href={pokemon.evolves_from_species?.name} className="capitalize underline">{pokemon.evolves_from_species?.name}</Link>
    </div>
  );
}
