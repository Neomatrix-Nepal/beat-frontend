import React, { useEffect, useState } from "react";
import { Eye, Check, Trash, Cross, X } from "lucide-react";
import { CreatorEntry } from "@/src/types";
import { formatDateTime } from "@/src/lib/utils";
import ConfirmPopUp from "../ui/confirmPopUp";
import PopupWrapper from "../shared/PopupWrapper";
import CreatorsDialogDetails from "../dialog/creatorsDialog";

interface CreatorTableProps {
  entries: CreatorEntry[];
  onDeleteEntry: (id: number) => void;
  onChangeStatus: (producerRequestId: number, status: string) => void;
  isLoading: boolean;
}

const statusStyles = {
  approved: "bg-green-800/20 text-green-400 border-green-800/30",
  pending: "bg-yellow-700/20 text-yellow-400 border-yellow-700/30",
  rejected: "bg-red-800/20 text-red-400 border-red-800/30",
};

export const CreatorTable: React.FC<CreatorTableProps> = ({
  entries,
  onDeleteEntry,
  onChangeStatus,
  isLoading,
}) => {
  const [selectedEntry, setSelectedEntry] = useState<CreatorEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number|null>(null);

  const openModal = (entry: CreatorEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const formatStatus = (
    status: string
  ): "pending" | "approved" | "rejected" => {
    const statusMapping: Record<string, string> = {
      pending: "pending",
      reject: "rejected",
      approved: "approved",
    };
    return (status = statusMapping[status] as
      | "pending"
      | "approved"
      | "rejected");
  };
  
  const handleDelete= async(id:number)=>{
    try{
      await Promise.resolve(onDeleteEntry(id));
    }catch(error){
      console.log(error)
    }finally{
      setDeletingId(null);
    }
  }
  return (
    <div className="bg-[#101828] rounded-xl border border-[#1D2939] overflow-hidden font-michroma">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1A2233] text-[#E4E4E7] border-b border-[#2C3A4F]">
            <tr>
              <th className="text-center p-4">Creator Id</th>
              <th className="text-left p-4">Creator's Name</th>
              <th className="text-left p-4">Producer Style</th>
              <th className="text-left p-4">Social Media URL</th>
              <th className="text-center p-4">Demo Beat</th>
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
                <td className="p-4 text-white font-medium text-center">{entry.userId}</td>
                <td className="p-4 text-white font-medium">{entry.name}</td>
                <td className="p-4 text-white font-medium text-center">{entry.style}</td>
                <td className="p-4 pl-12 text-blue-400 underline">
                  <a
                    href={entry.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link
                  </a>
                </td>
                <td className="p-4 text-center text-blue-400 underline">
                  <a
                    href={entry.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link
                  </a>
                </td>
                <td
                  className={`p-4 text-center font-semibold`}
                >
                  <div
                    className={`border-2 font-medium p-2 rounded-md text-center
                    ${statusStyles[formatStatus(entry.status)]}
                  `}
                  >
                    {formatStatus(entry.status)}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(entry)}
                      className="p-2 rounded-lg text-white hover:bg-slate-600/30 transition-colors"
                      title="View"
                      disabled={isLoading}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => {
                        onChangeStatus(entry.id, "approved");
                      }}
                      className={`p-2 rounded-lg transition-colors 
                        ${
                          entry.status === "approved"
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-foreground hover:bg-purple-500/20"
                        }`}
                      title="Approve"
                      disabled={entry.status === "approved" || isLoading}
                    >
                      <Check size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        onChangeStatus(entry.id, "reject");
                      }}
                      className={`p-2 rounded-lg transition-colors 
                        ${
                          entry.status === "reject"
                            ? "bg-red-500 cursor-not-allowed"
                            : "bg-foreground hover:bg-purple-500/20"
                        }`}
                      title="Reject"
                      disabled={entry.status === "reject" || isLoading}
                    >
                      <X size={16} className="text-white" />
                    </button>

                    <button
                      onClick={() => setDeletingId(entry.id)}
                      className="p-2 text-red-400 bg-foreground hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete"
                      disabled={isLoading}
                    >
                      <Trash size={16} />
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
                <div>
                  <h3 className="text-white font-medium">{entry.name}</h3>
                  <p className="text-blue-400 text-sm">{entry.style}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={entry.socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm"
              >
                Social Media URL: Open Link
              </a>
              <a
                href={entry.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm"
              >
                Demo Beat: Open Link
              </a>
              <div
                    className={`border-2 font-medium p-2 rounded-md text-center
                    ${statusStyles[formatStatus(entry.status)]}
                  `}
                  >
                    {formatStatus(entry.status)}
                  </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal(entry)}
                  className="p-2 rounded-lg text-white hover:bg-slate-600/30 transition-colors"
                  title="View"
                  disabled={isLoading}
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onChangeStatus(entry.id, "approved")}
                  className="p-2 rounded-lg text-green-400 hover:bg-green-600/20 transition-colors"
                  title="Approve"
                  disabled={isLoading}
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    onChangeStatus(entry.id, "reject");
                  }}
                  className="p-2 rounded-lg text-green-400 hover:bg-green-600/20 transition-colors"
                  title="Reject"
                  disabled={isLoading}
                >
                  <X size={16} className="text-white" />
                </button>
                <button
                  onClick={() => {
                    setDeletingId(entry.id)
                  }}
                  className="p-2 rounded-lg text-purple-400 hover:bg-purple-600/20 transition-colors"
                  title="Delete"
                  disabled={isLoading}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <PopupWrapper isOpen={!!selectedEntry}>
        <CreatorsDialogDetails details={selectedEntry} onClose={closeModal}/>
      </PopupWrapper>
      
      {
        deletingId && 
        <ConfirmPopUp
          title={"Delete Custom beat?"}
          message={"Are you sure you want to delete this custom beat?"}
          onCancel={() => setDeletingId(null)}
          onConfirm={() => {
            handleDelete(deletingId);
          }}
        />
      }
    </div>
  );
};
