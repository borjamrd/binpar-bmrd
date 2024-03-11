/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type TYPE } from "@/models/models";
import { firstLetterToUpperCase } from "@/utils/utils";
export default function Evolutions({
  evolutions,
}: {
  evolutions: TYPE

}) {
  return (
    <div className="hidden md:flex flex-col pl-1.5 gap-0.5 mb-2 border-l-2 border-opacity-50 border-gray-200">
      <p className="m-0 opacity-60 text-lg max-w-30ch">Evoluciona de:</p>
      <h4>{firstLetterToUpperCase(evolutions?.name)}</h4>
    </div>
  );
}
