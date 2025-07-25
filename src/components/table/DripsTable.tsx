// components/table/DripsTable.tsx
import React from "react";
import { Trash } from "lucide-react";
import { showDeleteToast, showUpdateToast } from "../../lib/util";
import Image from "next/image";
import { Drip } from "@/src/types/drip";

interface DripsTableProps {
  drips: Drip[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectDrip: (id: number) => void;
  onDeleteDrip: (id: number) => void;
}

export const DripsTable: React.FC<DripsTableProps> = ({
  drips,
  selectAll,
  onSelectAll,
  onSelectDrip,
  onDeleteDrip,
}) => {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden font-michroma">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-slate-600">
            <tr>
              <th className="text-left p-4 w-12">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Name
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">ID</th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Price
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Size
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Uploaded At
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {drips.map((drip, index) => (
              <tr
                key={`${drip.id}-${index}`}
                className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                  index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={drip.selected || false}
                    onChange={() => onSelectDrip(drip.id)}
                    className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                </td>
                <td className="p-4 text-white font-medium">{drip.name}</td>
                <td className="p-4 text-slate-300">{drip.id}</td>
                <td className="p-4 text-white font-semibold">${drip.price}</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-md font-medium bg-gray-500/20 text-white border-gray-500/30">
                    {drip.size}
                  </span>
                </td>
                <td className="p-4 text-slate-400">
                  {new Date(drip.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        showUpdateToast("Product", drip.name, "updated")
                      }
                      className="p-2 text-purple-400 bg-foreground hover:bg-purple-500/20 rounded-lg transition-colors"
                    >
                      <Image
                        src={"/image/tablevector/edit.png"}
                        alt="Edit"
                        width={16}
                        height={16}
                      />
                    </button>
                    <button
                      onClick={() => {
                        onDeleteDrip(drip.id);
                        showDeleteToast(
                          "Drip sucessfully deleted",
                          "Deleted",
                          "show all"
                        );
                      }}
                      className="p-2 text-red-400 bg-foreground hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Image
                        src={"/image/tablevector/bin.png"}
                        alt="Delete"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {drips.map((drip, index) => (
          <div
            key={`${drip.id}-${index}`}
            className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={drip.selected || false}
                  onChange={() => onSelectDrip(drip.id)}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <div>
                  <h3 className="text-white font-medium">{drip.name}</h3>
                  <p className="text-slate-400 text-sm">{drip.id}</p>
                </div>
              </div>
              <span className="text-white font-semibold">${drip.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-white border-gray-500/30">
                  {drip.size}
                </span>
                <span className="text-slate-400 text-sm">
                  {new Date(drip.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    showUpdateToast("Product", drip.name, "updated")
                  }
                  className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    onDeleteDrip(drip.id);
                    showDeleteToast(
                      "Drip sucessfully deleted",
                      "Deleted",
                      "show all"
                    );
                  }}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
