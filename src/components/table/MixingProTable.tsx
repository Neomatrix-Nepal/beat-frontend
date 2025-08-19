"use client";
import { Check, Trash } from "lucide-react";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import MixingProSubmissionDetails, {
  MixingProEntry,
} from "../dialog/mixingProDialog";
import LoadingEffect from "../loadingEffect";
import PopupWrapper from "../shared/PopupWrapper";
import ConfirmPopUp from "../ui/confirmPopUp";

interface MixingProTableProps {
  entries: MixingProEntry[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectEntry: (id: number) => void;
  onDeleteEntry: (id: number) => void;
  onMarkAsSent: (id: number) => void;
}

const statusStyles = {
  pending: "bg-yellow-700/20 text-yellow-400 border-yellow-700/30",
  in_progress: "bg-blue-800/20 text-blue-400 border-blue-800/30",
  completed: "bg-green-800/20 text-green-400 border-green-800/30",
};

export const MixingProTable: React.FC<MixingProTableProps> = ({
  entries,
  onSelectEntry,
  onDeleteEntry,
  onMarkAsSent,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<MixingProEntry | null>(
    null
  );
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>();

  const handleViewClick = (entry: MixingProEntry) => {
    setSelectedEntry(entry);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEntry(null);
  };

  const deleteEntry = async (id: number) => {
    setIsLoading(true);
    try {
      await Promise.resolve(onDeleteEntry(id));
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedEntryId(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#101828] rounded-xl border border-[#1D2939] overflow-hidden font-michroma">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1A2233] text-[#E4E4E7] border-b border-[#2C3A4F]">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className=" p-4">Uploaded Link</th>
              <th className="text-left p-4">Uploaded Date</th>
              <th className="text-center p-4">Status</th>
              <th className="text-center p-4">Actions</th>
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
                <td className="p-4 text-white font-medium max-w-50">
                  {entry.name}
                </td>
                <td className="p-4 text-blue-400">
                  <a
                    href={entry.referenceTrack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center"
                  >
                    Visit Link
                  </a>
                </td>
                <td className="p-4 text-slate-400">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <div
                    className={`py-2 rounded-sm text-md font-medium border ${
                      statusStyles[entry.status]
                    }`}
                  >
                    {entry.status.charAt(0).toUpperCase() +
                      entry.status.slice(1)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleViewClick(entry)}
                      className="cursor-pointer p-2 text-white bg-foreground hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <IoMdEye size={16} />
                    </button>
                    <button
                      onClick={() => onMarkAsSent(entry.id)}
                      className="cursor-pointer p-2 rounded-lg bg-black text-white hover:bg-purple-700 transition-colors"
                      title="Mark Sent"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEntryId(entry.id);
                        setDeletePopUp(true);
                      }}
                      className="cursor-pointer p-2 bg-black rounded-lg text-red-400 hover:bg-red-600/20 transition-colors"
                    >
                      <Trash size={16} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div className="lg:hidden space-y-4 p-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#1A1F2E] rounded-lg p-4 border border-[#2C3A4F] "
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-medium">{entry.name}</h3>
                <p className="text-white text-sm break-all">{entry.email}</p>
                <p className="text-white text-sm">{entry.musicGenre}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-md text-xs font-medium border ${
                  statusStyles[entry.status]
                }`}
              >
                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-slate-400 text-sm">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewClick(entry)}
                  className="p-2 rounded-lg text-white hover:bg-slate-600/30 transition-colors"
                  title="View"
                >
                  <IoMdEye size={16} />
                </button>
                <button
                  onClick={() => onMarkAsSent(entry.id)}
                  className="p-2 rounded-lg text-green-400 hover:bg-green-600/20 transition-colors"
                  title="Mark Sent"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedEntryId(entry.id);
                    setDeletePopUp(true);
                  }}
                  className="p-2 rounded-lg hover:bg-red-600/20 transition-colors"
                  title="Delete"
                >
                  <Trash size={16} className="text-red-400"/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PopupWrapper isOpen={isPopupOpen}>
        <MixingProSubmissionDetails
          entry={selectedEntry}
          onClose={handleClosePopup}
        />
      </PopupWrapper>

      {deletePopUp && (
        <ConfirmPopUp
          title={"Delete Customer order?"}
          message={"Are you sure you want to delete this order?"}
          onCancel={() => setDeletePopUp(false)}
          onConfirm={() => {
            setDeletePopUp(false);
            deleteEntry(selectedEntryId!);
          }}
        />
      )}

      {isLoading && <LoadingEffect />}
    </div>
  );
};
