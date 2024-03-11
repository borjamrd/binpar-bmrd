import { type Pokemon } from "@/models/models";

export default function Types({ types }: { types: Pokemon['types'] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {types?.map((type, i) => (
        <p className="m-0 opacity-60 text-lg max-w-30ch" key={i}>
          {" "}
          {type.type?.name?.toUpperCase()}
        </p>
      ))}
    </div>
  );
}
