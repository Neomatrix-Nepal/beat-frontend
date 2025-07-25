import React from "react";

import { formatDateTime } from "@/src/lib/utils";
import { BeatsTableProps } from "@/src/types";
import Image from "next/image";

const genreColors: Record<string, string> = {
  chill: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "R&B": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Hip Hop": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Pop: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

export const BeatsTable: React.FC<BeatsTableProps> = ({
  beats,
  onEditBeat,
  onDeleteBeat,
}) => {
  if (beats.length === 0) return null;
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden font-michroma">
      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-slate-600">
            <tr>
              <th className="text-left p-4 w-12"></th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Title
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Genre
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Price
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Producer
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Upload Date
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {beats.length > 0 &&
              beats?.map((beat, index) => (
                <tr
                  key={beat.id}
                  className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                    index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
                  }`}
                >
                  <td className="p-4">
                    {/* <input
                    type="checkbox"
                    checked={beat.selected}
                    onChange={() => onSelectBeat(beat.id)}
                    className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                  /> */}
                  </td>
                  <td className="p-4 text-white font-medium">
                    {beat?.name || ""}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        genreColors[beat.subCategory?.name] ||
                        "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {beat?.subCategory?.name || ""}
                    </span>
                  </td>
                  <td className="p-4 text-white font-semibold">
                    ${beat.price}
                  </td>
                  <td className="p-4 text-slate-300">{"Cute Boka"}</td>
                  <td className="p-4 text-slate-400">
                    {formatDateTime(beat.updated_at)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onEditBeat(beat);
                        }}
                        className="p-2 text-white bg-custom hover:bg-white border-2  border-white hover:border-red-600 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDeleteBeat(beat.id.toString());
                          // showDeleteToast(
                          //   "Delete?",
                          //   "Are you sure?",
                          //   "Confirm"
                          // );
                        }}
                        className="p-2 text-white bg-red-600 hover:text-red-600 hover:bg-white border-2  border-white hover:border-red-600 rounded-lg transition-colors"
                      >
                        Delete
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
        {beats.length > 0 &&
          beats?.map((beat) => (
            <div
              key={beat.id}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-white font-medium">{beat?.name}</h3>
                    <p className="text-slate-400 text-sm">{"Cute Boka"}</p>
                  </div>
                </div>
                <span className="text-white font-semibold">${beat.price}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      genreColors[beat?.subCategory?.name] ||
                      "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {beat?.subCategory?.name || ""}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {formatDateTime(beat.updated_at)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-red-400 hover:bg-green-500/20 rounded-lg transition-colors">
                    <Image
                      src={"/image/verctor/play.png"}
                      alt="Play"
                      width={16}
                      height={16}
                    />
                  </button>

                  <button className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors">
                    <Image
                      src={"/image/verctor/edit.png"}
                      alt="Edit"
                      width={16}
                      height={16}
                    />
                  </button>

                  <button
                    onClick={() => {
                      onDeleteBeat(beat.id.toString());
                      // showDeleteToast("Delete?", "Are you sure?", "Confirm");
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Image
                      src={"/image/verctor/bin.png"}
                      alt="Delete"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
