import React, { useState } from "react";
import { Eye, Check, Trash } from "lucide-react";
import { showDeleteToast, showUpdateToast } from "../../lib/util";
import Image from "next/image";
import bin from "@/image/tablevector/bin.png";
import whitecheck from "@/image/tablevector/whitecheck.png";
import { IoMdEye } from "react-icons/io";
import PopupWrapper from "../shared/PopupWrapper";
import MixingProSubmissionDetails from "../dialog/mixingProDialog";
import BeatsDialogDetails from "../dialog/beatsDialog";
export interface MixingProEntry {
  id: string;
  name: string;
  link: string;
  uploadDate: string;
  status: "Pending" | "Sent";
  selected: boolean;
}

interface MixingProTableProps {
  entries: MixingProEntry[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectEntry: (id: string) => void;
  onDeleteEntry: (id: string) => void;
}

const statusStyles = {
  Pending: "bg-yellow-700/20 text-yellow-400 border-yellow-700/30",
  Sent: "bg-green-800/20 text-green-400 border-green-800/30",
};

export const CustombeatsTable: React.FC<MixingProTableProps> = ({
  entries,
  selectAll,
  onSelectAll,
  onSelectEntry,
  onDeleteEntry,
}) => {
   const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [selectedEntry, setSelectedEntry] = useState<MixingProEntry | null>(null);
    
      const handleViewClick = () => {
        //setSelectedEntry(entry);
        setIsPopupOpen(true);
      };
    
      const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedEntry(null);
      };
  return (
    <div className="bg-[#101828] rounded-xl border border-[#1D2939] overflow-hidden font-michroma">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1A2233] text-[#E4E4E7] border-b border-[#2C3A4F]">
            <tr>
              <th className="p-4 w-10"></th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Refrence Link</th>
              <th className="text-left p-4">Upload Date</th>
              <th className=" p-4 text-center">Status</th>
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
                <td className="p-4 text-blue-400 underline">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.link}
                  </a>
                </td>
                <td className="p-4 text-slate-400">{entry.uploadDate}</td>
                <td className="p-4     text-center">
                  <div
                    className={`   py-2 rounded-sm text-md  font-medium border ${
                      statusStyles[entry.status]
                    }`}
                  >
                    {entry.status}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                                        onClick={() => handleViewClick()}

                    className="p-2  text-white  bg-foreground hover:bg-green-500/20 rounded-lg transition-colors">
                      <IoMdEye size={16} />
                    </button>

                    <button
                      onClick={() => {
                       showUpdateToast("xxx", "yyy","zzz")
                      }}
                      className="p-2 bg-foreground hover:bg-purple-500/20 rounded-lg transition-colors"
                    >
                      <Image
                        src={whitecheck}
                        alt="check"
                        width={14}
                        height={14}
                        className=" m-0.5 my-1"
                      />
                    </button>

                    <button
                      onClick={() => {
                        //onDeleteBeat(beat.id);
                        showDeleteToast("yyy", "xxx","zzz");
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
        {entries.map((entry, index) => (
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
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline text-sm"
                  >
                    View Link
                  </a>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-md text-xs font-medium border ${
                  statusStyles[entry.status]
                }`}
              >
                {entry.status}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-slate-400 text-sm">{entry.uploadDate}</span>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg text-white hover:bg-slate-600/30 transition-colors"
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() =>showUpdateToast("xxx", "yyy","zzz")}
                  className="p-2 rounded-lg text-green-400 hover:bg-green-600/20 transition-colors"
                  title="Mark Sent"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    onDeleteEntry(entry.id);
  showDeleteToast("yyy", "xxx","zzz");                  }}
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
        <PopupWrapper isOpen={isPopupOpen} >
        <BeatsDialogDetails onClose={handleClosePopup}/>
      </PopupWrapper>
    </div>
  );
};
