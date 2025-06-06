import React from "react";
import { Trash } from "lucide-react";
import { showDeleteToast, showUpdateToast } from "../../lib/util";
import bin from "@/image/tablevector/bin.png";
import edit from "@/image/tablevector/edit.png";
import Image from "next/image";

interface Work {
  id: string;
  title: string;
  description: string;
  platform: "YouTube" | "Spotify";
  uploadDate: string;
  selected: boolean;
}

interface LatestWorkTableProps {
  works: Work[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectWork: (id: string) => void;
  onDeleteWork: (id: string) => void;
}

export const LatestWorkTable: React.FC<LatestWorkTableProps> = ({
  works,
  selectAll,
  onSelectAll,
  onSelectWork,
  onDeleteWork,
}) => {
  const getPlatformIcon = (platform: "YouTube" | "Spotify") => {
    if (platform === "YouTube") {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.186a2.97 2.97 0 0 0-2.09-2.096C19.465 3.5 12 3.5 12 3.5s-7.465 0-9.408.59A2.97 2.97 0 0 0 .502 6.186 31.19 31.19 0 0 0 0 12a31.19 31.19 0 0 0 .502 5.814 2.97 2.97 0 0 0 2.09 2.096C4.535 20.5 12 20.5 12 20.5s7.465 0 9.408-.59a2.97 2.97 0 0 0 2.09-2.096A31.19 31.19 0 0 0 24 12a31.19 31.19 0 0 0-.502-5.814zM9.75 15.75V8.25l6.5 3.75-6.5 3.75z" fill="#FF0000" />
        </svg>
      );
    } else if (platform === "Spotify") {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.102 17.424a.75.75 0 0 1-1.029.27c-2.64-1.617-5.94-1.986-9.837-1.089a.75.75 0 1 1-.33-1.458c4.227-.966 7.875-.531 10.818 1.272a.75.75 0 0 1 .378 1.005zm1.41-3.075a.938.938 0 0 1-1.286.338c-3.108-1.905-7.83-2.463-11.49-1.347a.938.938 0 0 1-.413-1.823c4.104-1.242 9.33-.618 12.87 1.497a.938.938 0 0 1 .319 1.335zm.375-3.525c-3.72-2.205-9.855-2.415-13.41-1.335a1.125 1.125 0 1 1-.495-2.188c4.095-1.215 10.845-.975 15.12 1.455a1.125 1.125 0 0 1-1.215 1.913z" fill="#1DB954" />
        </svg>
      );
    }
    return null;
  };

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
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Platform</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {works.map((work, index) => (
              <tr
                key={`${work.id}-${index}`}
                className={`border-b border-[#2C3A4F] hover:bg-[#1A2233]/50 transition-colors ${
                  index % 2 === 0 ? "bg-[#1C2433]" : "bg-[#1A1F2E]"
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={work.selected}
                    onChange={() => onSelectWork(work.id)}
                    className="w-4 h-4 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                </td>
                <td className="p-4 text-white font-medium">{work.title}</td>
                <td className="p-4 text-white">{work.description.slice(0, 50)}...</td>
                <td className="p-4 text-center flex justify-center">{getPlatformIcon(work.platform)}</td>
                <td className="p-4 text-white">{work.uploadDate}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showUpdateToast("Updated!", "Updated")}
                      className="p-2 bg-foreground hover:bg-purple-500/20 rounded-lg transition-colors"
                    >
                      <Image src={edit} alt="Edit" width={14} height={14} className="m-0.5 my-1" />
                    </button>
                    <button
                      onClick={() => {
                        onDeleteWork(work.id);
                        showDeleteToast("Deleted!", "Deleted");
                      }}
                      className="p-2 text-red-400 bg-foreground hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Image src={bin} alt="Delete" width={14} height={14} className="m-0.5 my-1" />
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
        {works.map((work, index) => (
          <div
            key={`${work.id}-${index}`}
            className="bg-[#1A1F2E] rounded-lg p-4 border border-[#2C3A4F]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={work.selected}
                  onChange={() => onSelectWork(work.id)}
                  className="w-4 h-4 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <div>
                  <h3 className="text-white font-medium">Title: {work.title}</h3>
                  <p className="text-white text-sm">Desc: {work.description.slice(0, 30)}...</p>
                </div>
              </div>
              <div>{getPlatformIcon(work.platform)}</div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-white text-sm">Date: {work.uploadDate}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showUpdateToast("Updated!", "Updated")}
                  className="p-2 rounded-lg text-white hover:bg-purple-600/20 transition-colors"
                  title="Edit"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    onDeleteWork(work.id);
                    showDeleteToast("Deleted!", "Deleted");
                  }}
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