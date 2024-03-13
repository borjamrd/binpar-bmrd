/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type TYPE } from "@/models/models";
import { firstLetterToUpperCase } from "@/utils/utils";
export default function Evolutions({
  evolutions,
  flex
}: {
  evolutions: TYPE,
  flex: 'col' | 'row'

}) {

  return (
    <div className={`hidden md:flex flex-${flex} ${flex === 'col' ? 'gap-0' : 'gap-2'} mb-2 text-sm max-w-30ch text-gray-800 font-semibold rounded-xl`}>
      <p >Evolution from: </p>
      <p className="capitalize">{evolutions?.name}</p>
    </div>
  );
}
