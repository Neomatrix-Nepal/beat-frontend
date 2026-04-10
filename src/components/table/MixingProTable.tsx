import { Check, Trash, Eye, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import MixingProSubmissionDetails, {
  MixingProEntry,
} from "../dialog/mixingProDialog";
import LoadingEffect from "../loadingEffect";
import PopupWrapper from "../shared/PopupWrapper";
import ConfirmPopUp from "../ui/confirmPopUp";
import { formatDateTime } from "@/src/lib/utils";

interface MixingProTableProps {
  entries: MixingProEntry[];
  onDeleteEntry: (id: number) => void;
  onMarkAsSent: (id: number) => void;
}

const statusStyles = {
  pending: "bg-yellow-700/20 text-yellow-400 border-yellow-700/30",
  in_progress: "bg-blue-800/20 text-blue-400 border-blue-800/30",
  completed: "bg-green-800/20 text-[#00e08f] border-[#00e08f]/30",
};

export const MixingProTable: React.FC<MixingProTableProps> = ({
  entries,
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
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Customer Name</th>
              <th className="text-center p-4">Asset Link</th>
              <th className="text-left p-4">Date Received</th>
              <th className="text-center p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={`border-b border-[#2C3A4F] hover:bg-[#1A2233]/50 transition-colors ${
                    index % 2 === 0 ? "bg-[#1C2433]" : "bg-[#1A1F2E]"
                  }`}
                >
                  <td className="p-4 text-white font-medium">{entry.id}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{entry.name}</span>
                      <span className="text-[10px] text-slate-500 lowercase">{entry.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <a
                      href={entry.referenceTrack}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#00e08f] hover:underline text-xs"
                    >
                      Drive Asset <ExternalLink size={12} />
                    </a>
                  </td>
                  <td className="p-4 text-slate-400 text-xs">
                    {formatDateTime(entry.createdAt)}
                  </td>
                  <td className="p-4 text-center">
                    <div
                      className={`py-1.5 px-3 rounded-md text-[10px] font-bold uppercase tracking-wider border inline-block ${
                        statusStyles[entry.status as keyof typeof statusStyles]
                      }`}
                    >
                      {entry.status.replace("_", " ")}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleViewClick(entry)}
                        className="p-2 text-white bg-foreground hover:bg-slate-700/50 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onMarkAsSent(entry.id)}
                        disabled={entry.status === "completed"}
                        className="p-2 rounded-lg bg-foreground hover:bg-[#00e08f]/20 text-[#00e08f] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Mark Delivered"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEntryId(entry.id);
                          setDeletePopUp(true);
                        }}
                        className="p-2 bg-black rounded-lg text-red-400 hover:bg-red-600/20 transition-all"
                        title="Delete order"
                      >
                        <Trash size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 italic">
                  No mixing orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#1A1F2E] rounded-lg p-5 border border-[#2C3A4F] space-y-4 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">ID: {entry.id}</p>
                <h3 className="text-white font-bold text-base">{entry.name}</h3>
                <p className="text-slate-400 text-[11px] break-all">{entry.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                  statusStyles[entry.status as keyof typeof statusStyles]
                }`}
              >
                {entry.status.replace("_", " ")}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase">Received</span>
                <span className="text-slate-300 text-xs">
                  {formatDateTime(entry.createdAt).split(",")[0]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewClick(entry)}
                  className="p-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/5"
                  title="View"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onMarkAsSent(entry.id)}
                  disabled={entry.status === "completed"}
                  className="p-2.5 rounded-xl bg-[#00e08f]/10 text-[#00e08f] hover:bg-[#00e08f]/20 transition-all border border-[#00e08f]/10 disabled:opacity-20"
                  title="Mark Sent"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedEntryId(entry.id);
                    setDeletePopUp(true);
                  }}
                  className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/10"
                  title="Delete"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PopupWrapper isOpen={isPopupOpen}>
        <div className="mx-4">
          <MixingProSubmissionDetails
            entry={selectedEntry}
            onClose={handleClosePopup}
            onStatusChange={onMarkAsSent}
          />
        </div>
      </PopupWrapper>

      {deletePopUp && (
        <ConfirmPopUp
          title={"Delete Mixing Order?"}
          message={"Are you sure you want to remove this mixing request documentation? This action cannot be undone."}
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
