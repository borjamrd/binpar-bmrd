import { type Pokemon } from "@/models/models";
export default function Abilities({
  abilities,
}: {
  abilities: Pokemon["abilities"];
}) {
  return (
    <div className="flex flex-col pl-1.5 gap-0.5 mb-2 border-l-2 border-opacity-50 border-gray-200">
      <p>Abilidades:</p>
      {abilities?.map((ability) => {
        return <h4 key={ability.ability.name}>{ability.ability.name}</h4>;
      })}
    </div>
  );
}
