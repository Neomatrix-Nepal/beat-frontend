import React from "react";
import { Play, Trash } from "lucide-react";
import { toast } from "@/lib/use-toast";
import { showDeleteToast, showUpdateToast } from "../../lib/util";
import play from "@/image/tablevector/play.png";
import bin from "@/image/tablevector/bin.png";
import edit from "@/image/tablevector/edit.png";
import Image from "next/image";
interface Beat {
  id: string;
  title: string;
  genre: string;
  price: number;
  producer: string;
  uploadDate: string;
  selected: boolean;
}

interface BeatsTableProps {
  beats: Beat[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectBeat: (id: string) => void;
  onDeleteBeat: (id: string) => void;
}

const genreColors: Record<string, string> = {
  Trap: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "R&B": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Hip Hop": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Pop: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

export const BeatsTable: React.FC<BeatsTableProps> = ({
  beats,
  selectAll,
  onSelectAll,
  onSelectBeat,
  onDeleteBeat,
}) => {
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
            {beats.map((beat, index) => (
              <tr
                key={beat.id}
                className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                  index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={beat.selected}
                    onChange={() => onSelectBeat(beat.id)}
                    className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                </td>
                <td className="p-4 text-white font-medium">{beat.title}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      genreColors[beat.genre] ||
                      "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {beat.genre}
                  </span>
                </td>
                <td className="p-4 text-white font-semibold">${beat.price}</td>
                <td className="p-4 text-slate-300">{beat.producer}</td>
                <td className="p-4 text-slate-400">{beat.uploadDate}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2   bg-foreground hover:bg-green-500/20 rounded-lg transition-colors">
                      <Image src={play} alt="Play" width={16} height={16} />
                    </button>

                    <button
                      onClick={() => {
                        showUpdateToast(
                          "Item Updated successfully!",
                          "Updated"
                        );
                      }}
                      className="p-2 text-purple-400 bg-foreground hover:bg-purple-500/20 rounded-lg transition-colors"
                    >
                      <Image src={edit} alt="Edit" width={16} height={16} />
                    </button>

                    <button
                      onClick={() => {
                        onDeleteBeat(beat.id);
                        showDeleteToast(
                          "Item deleted successfully!",
                          "Deleted"
                        );
                      }}
                      className="p-2 text-red-400 bg-foreground hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Image src={bin} alt="Delete" width={16} height={16} />
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
        {beats.map((beat) => (
          <div
            key={beat.id}
            className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={beat.selected}
                  onChange={() => onSelectBeat(beat.id)}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <div>
                  <h3 className="text-white font-medium">{beat.title}</h3>
                  <p className="text-slate-400 text-sm">{beat.producer}</p>
                </div>
              </div>
              <span className="text-white font-semibold">${beat.price}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    genreColors[beat.genre] ||
                    "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }`}
                >
                  {beat.genre}
                </span>
                <span className="text-slate-400 text-sm">
                  {beat.uploadDate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-red-400 hover:bg-green-500/20 rounded-lg transition-colors">
                  <Image src={play} alt="Play" width={16} height={16} />
                </button>

                <button className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors">
                  <Image src={edit} alt="Edit" width={16} height={16} />
                </button>

                <button
                  onClick={() => {
                    onDeleteBeat(beat.id);
                    showDeleteToast("Item deleted successfully!", "Deleted");
                  }}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Image src={bin} alt="Delete" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
