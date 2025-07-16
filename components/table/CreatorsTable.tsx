import React from "react";
import { Eye, Check, Trash } from "lucide-react";
import Image from "next/image";
import bin from "@/image/tablevector/bin.png";
import whitecheck from "@/image/tablevector/whitecheck.png";
import { CreatorEntry } from "@/types";

export interface FrontendCreatorEntry extends CreatorEntry {
  name: string;
  style: string;
  socialMediaUrl: string;
  selected: boolean;
}

interface CreatorTableProps {
  entries: FrontendCreatorEntry[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectEntry: (id: number) => void;
  onDeleteEntry: (id: number) => void;
  onApproveEntry: (userId: number, rowId: number) => void;
}

export const CreatorTable: React.FC<CreatorTableProps> = ({
  entries,
  selectAll,
  onSelectAll,
  onSelectEntry,
  onDeleteEntry,
  onApproveEntry,
}) => {
  return (
    <div className="bg-[#101828] rounded-xl border border-[#1D2939] overflow-hidden font-michroma">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1A2233] text-[#E4E4E7] border-b border-[#2C3A4F]">
            <tr>
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
              </th>
              <th className="text-left p-4">Creator's Name</th>
              <th className="text-left p-4">Producer Style</th>
              <th className="text-left p-4">Social Media URL</th>
              <th className="text-center p-4">Demo Beat</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr
                key={entry.id}
                className={`border-b border-[#2C3A4F] hover:bg-[#1A2233]/50 transition-colors ${
                  index % 2 === 0 ? "bg-[#1C2433]" : "bg-[#1A1F2E]"
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={entry.selected}
                    onChange={() => onSelectEntry(entry.id)}
                    className="w-4 h-4 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                </td>
                <td className="p-4 text-white font-medium">{entry.name}</td>
                <td className="p-4 pl-16 text-blue-400">{entry.style}</td>
                <td className="p-4 pl-12 text-blue-400 underline">
                  <a
                    href={entry.socialMediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link
                  </a>
                </td>
                <td className="p-4 text-center text-blue-400 underline">
                  <a
                    href={entry.demoBeat}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link
                  </a>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        console.log(
                          "userId:",
                          entry.userId,
                          "rowId:",
                          entry.id
                        );
                        onApproveEntry(entry.userId, entry.id);
                      }}
                      className={`p-2 rounded-lg transition-colors 
                        ${
                          entry.isRoleChanged
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-foreground hover:bg-purple-500/20"
                        }`}
                      title="Approve"
                      disabled={entry.isRoleChanged}
                    >
                      <Image
                        src={whitecheck}
                        alt="Approve"
                        width={14}
                        height={14}
                        className="m-0.5 my-1"
                      />
                    </button>

                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="p-2 text-red-400 bg-foreground hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete"
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
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#1A1F2E] rounded-lg p-4 border border-[#2C3A4F]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={entry.selected}
                  onChange={() => onSelectEntry(entry.id)}
                  className="w-4 h-4 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <div>
                  <h3 className="text-white font-medium">{entry.name}</h3>
                  <p className="text-blue-400 text-sm">{entry.style}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={entry.socialMediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm"
              >
                Social Media URL: Open Link
              </a>
              <a
                href={entry.demoBeat}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm"
              >
                Demo Beat: Open Link
              </a>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg text-white hover:bg-slate-600/30 transition-colors"
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onApproveEntry(entry.userId, entry.id)}
                  className="p-2 rounded-lg text-green-400 hover:bg-green-600/20 transition-colors"
                  title="Approve"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  className="p-2 rounded-lg text-purple-400 hover:bg-purple-600/20 transition-colors"
                  title="Delete"
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
