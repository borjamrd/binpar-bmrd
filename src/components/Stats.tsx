/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Pokemon } from "@/models/models";
import { removeHyphens } from "@/utils/utils";

export default function Stats({ stats }: { stats: Pokemon['stats'] }) {
  return (
    <div className="flex flex-wrap lg:gap-2 gap-0 mb-2 w-full text-xs lg:text-sm p-4">
      {stats && (
        <table className="table-auto w-full ">
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.stat.name} className="border-t-2 border-gray-200 ">
                <td className="lg:py-2 py-1 pr-2 uppercase text-gray-600 font-semibold">{removeHyphens(stat.stat.name)}</td>
                <td className="lg:py-2 py-1 pl-2 text-gray-400 font-semibold ">{stat.base_stat}</td>
                <td className="lg:py-2 py-1 lg:min-w-56 min-w-36">
                  <div className="w-full bg-gray-200 rounded-full p-1">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(stat.base_stat / 100) * 100}%` }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}

    </div>
  )
}