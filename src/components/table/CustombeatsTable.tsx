"use client";
import { CustomBeat } from "@/src/types";
import { Check, Trash, Eye } from "lucide-react";
import React, { useState } from "react";
import BeatsDialogDetails from "../dialog/beatsDialog";
import LoadingEffect from "../loadingEffect";
import PopupWrapper from "../shared/PopupWrapper";
import ConfirmPopUp from "../ui/confirmPopUp";
import toast from "react-hot-toast";

interface CustomBeatsTableProps {
  entries: CustomBeat[];
  onDeleteEntry: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

const statusStyles = {
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  sent: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  completed: "text-[#00e08f] bg-[#00e08f1a] border-[#00e08f33]",
};

export const CustombeatsTable: React.FC<CustomBeatsTableProps> = ({
  entries,
  onDeleteEntry,
  onStatusChange,
}) => {
  const [beats, setBeats] = useState<CustomBeat[]>(entries);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<CustomBeat | null>(null);
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>();

  const handleViewClick = (entry: CustomBeat) => {
    setSelectedEntry(entry);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEntry(null);
  };

  const handleStatusChange = async (
    id: number,
    status: "pending" | "sent" | "completed"
  ) => {
    try {
      await Promise.resolve(onStatusChange(id, status));
      setBeats((prev) =>
        prev.map((beat) => (beat.id === id ? { ...beat, status } : beat))
      );
      toast.success("Beat status updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update beat status");
    }
  };

  const deleteBeat = async (id: number) => {
    setIsLoading(true);
    try {
      await Promise.resolve(onDeleteEntry(id));
      setBeats((prev) => prev.filter((beat) => beat.id !== id));
      toast.success("Beat deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete beat");
    } finally {
      setSelectedEntryId(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#101828] rounded-2xl border border-white/5 overflow-hidden font-michroma shadow-2xl">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-[#E4E4E7] border-b border-white/10">
            <tr>
              <th className="text-left p-5 font-bold uppercase tracking-wider text-[10px] text-gray-500">Name</th>
              <th className="text-center p-5 font-bold uppercase tracking-wider text-[10px] text-gray-500">Reference Track</th>
              <th className="text-left p-5 font-bold uppercase tracking-wider text-[10px] text-gray-500">Upload Date</th>
              <th className="p-5 text-center font-bold uppercase tracking-wider text-[10px] text-gray-500">Status</th>
              <th className="text-center p-5 font-bold uppercase tracking-wider text-[10px] text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {beats.map((entry, index) => (
              <tr
                key={entry.id}
                className={`border-b border-white/5 hover:bg-white/10 transition-all duration-200 group`}
              >
                <td className="p-5 text-white font-medium">
                  {entry.name}
                </td>
                <td className="p-5 text-[#00e08f] text-center">
                  <a
                    href={entry.referenceTrack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-[11px] font-bold"
                  >
                    View File
                  </a>
                </td>
                <td className="p-5 text-slate-400 text-xs">
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </td>
                <td className="p-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      statusStyles[entry.status]
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => handleViewClick(entry)}
                      className="p-2 text-white bg-white/5 hover:bg-[#00e08f] hover:text-black rounded-xl transition-all duration-300 shadow-lg"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    {entry.status !== "completed" && (
                      <button
                        onClick={() => handleStatusChange(entry.id, "completed")}
                        className="p-2 text-white bg-white/5 hover:bg-[#00e08f] hover:text-black rounded-xl transition-all duration-300 shadow-lg"
                        title="Mark Completed"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedEntryId(entry.id);
                        setDeletePopUp(true);
                      }}
                      className="p-2 text-red-400 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 shadow-lg"
                      title="Delete Entry"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4 bg-[#0f0f10]">
        {beats.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#1d2733] rounded-2xl p-5 border border-white/5 shadow-lg group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="min-w-0">
                <h3 className="text-white font-bold text-sm truncate pr-2">
                  {entry.name}
                </h3>
                <p className="text-gray-500 text-[10px] mt-1">
                  ID: {entry.id} • {new Date(entry.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                  statusStyles[entry.status]
                }`}
              >
                {entry.status}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <a
                href={entry.referenceTrack}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00e08f] text-[11px] font-bold hover:underline"
              >
                Reference Track
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewClick(entry)}
                  className="p-2 bg-white/5 text-white hover:bg-[#00e08f] hover:text-black rounded-lg transition-all"
                >
                  <Eye size={16} />
                </button>
                {entry.status !== "completed" && (
                   <button
                   onClick={() => handleStatusChange(entry.id, "completed")}
                   className="p-2 bg-white/5 text-white hover:bg-[#00e08f] hover:text-black rounded-lg transition-all"
                 >
                   <Check size={16} />
                 </button>
                )}
                <button
                  onClick={() => {
                    setSelectedEntryId(entry.id);
                    setDeletePopUp(true);
                  }}
                  className="p-2 bg-white/5 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PopupWrapper isOpen={isPopupOpen}>
        <BeatsDialogDetails
          onClose={handleClosePopup}
          onStatusChange={handleStatusChange}
          beat={selectedEntry}
        />
      </PopupWrapper>

      {deletePopUp && (
        <ConfirmPopUp
          title={"Delete Custom beat?"}
          message={"Are you sure you want to delete this custom beat? This action cannot be undone."}
          onCancel={() => setDeletePopUp(false)}
          onConfirm={() => {
            setDeletePopUp(false);
            deleteBeat(selectedEntryId!);
          }}
        />
      )}

      {isLoading && <LoadingEffect />}
    </div>
  );
};
