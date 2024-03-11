import { type Pokemon } from "@/models/models";

export default function Types({ types }: { types: Pokemon['types'] }) {
  return (
    <div className="flex flex-wrap lg:gap-2 gap-0 mb-2">
      {types?.map((type, i) => (
        <p className="m-0 text-white font-bold lg:text-xl text-lg max-w-30ch" key={i}>
          {" "}
          {type.type?.name?.toUpperCase()}
        </p>
      ))}
    </div>
  );
}
