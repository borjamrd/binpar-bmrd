import { type Pokemon } from "@/models/models";
import { removeHyphens } from "@/utils/utils";
export default function Abilities({
  abilities,
}: {
  abilities: Pokemon["abilities"];
}) {
  return (
    <div className="flex gap-2 flex-col items-center">
      <p className="text-sm text-gray-400 tracking-wide">Abilities:</p>
      <div className="flex flex-row  gap-2 lg:gap-3 mb-2">

        {abilities?.map((ability) => {
          return <span className="px-2 py-1 bg-slate-200 rounded-xl text-slate-500 font-semibold text-sm capitalize" key={ability.ability.name}>{removeHyphens(ability.ability.name)}</span>;
        })}
      </div>
    </div>

  );
}
