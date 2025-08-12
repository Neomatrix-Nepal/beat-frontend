"use state";
import { updateCustomBeatStatus } from "@/src/app/actions/customs-beats-actions";
import { CustomBeat } from "@/src/types";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { showDeleteToast } from "../../lib/util";
import BeatsDialogDetails from "../dialog/beatsDialog";
import PopupWrapper from "../shared/PopupWrapper";
import LoadingEffect from "../loadingEffect";
import ConfirmPopUp from "../ui/confirmPopUp";

interface CustombeatsTableProps {
  entries: CustomBeat[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectEntry: (id: number) => void;
  onDeleteEntry: (id: string) => void;
}

const statusStyles = {
  pending: "bg-yellow-700/20 text-yellow-400 border-yellow-700/30",
  sent: "bg-orange-800/20 text-orange-400 border-orange-800/30",
  completed: "bg-green-800/20 text-green-400 border-green-800/30"
};

export const CustombeatsTable: React.FC<CustombeatsTableProps> = ({
  entries,
  onSelectEntry,
  onDeleteEntry,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<CustomBeat | null>(null);
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string|null>();

  const handleViewClick = (entry: CustomBeat) => {
    setSelectedEntry(entry);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEntry(null);
  };

  const deleteBeat = async(id: string) =>{
    setIsLoading(true);
    try{
      await Promise.resolve(onDeleteEntry(id));
    }catch(error){
      console.log(error);
    }finally{
      setSelectedEntryId(null);
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#101828] rounded-xl border border-[#1D2939] overflow-hidden font-michroma">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1A2233] text-[#E4E4E7] border-b border-[#2C3A4F]">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-center p-4">Reference Track</th>
              <th className="text-left p-4">Upload Date</th>
              <th className="p-4 text-center">Status</th>
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
                <td className="p-4 text-white font-medium max-w-50">{entry.name}</td>
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
                    {entry.status}
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
                      onClick={() => {
                        updateCustomBeatStatus(
                          entry.id,
                          "completed",
                          (success) => {
                            if (success) {
                              // showUpdateToast(
                              //   "Custom beat",
                              //   "status updated",
                              //   "success"
                              // );
                            }
                          }
                        );
                      }}
                      className="cursor-pointer p-2 bg-foreground hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <Image
                        src={"/image/tablevector/whitecheck.png"}
                        alt="check"
                        width={14}
                        height={14}
                        className="m-0.5 my-1"
                      />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEntryId(entry.id.toString());
                        setDeletePopUp(true);
                      }}
                      className="cursor-pointer p-2 text-red-400 bg-foreground hover:bg-purple-600/20 rounded-lg transition-colors"
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
                    href={entry.referenceTrack}
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
                  onClick={() => {
                    updateCustomBeatStatus(entry.id, "completed", (success) => {
                      if (success) {
                        // showUpdateToast(
                        //   "Custom beat",
                        //   "status updated",
                        //   "success"
                        // );
                      }
                    });
                  }}
                  className="p-2 rounded-lg text-green-400 hover:bg-green-600/20 transition-colors"
                  title="Mark Sent"
                >
                  <Image
                    src={"/image/tablevector/whitecheck.png"}
                    alt="Check"
                    width={16}
                    height={16}
                  />
                </button>
                <button
                  onClick={() => {
                    onDeleteEntry(entry.id.toString());
                    showDeleteToast("Custom beat", "deleted", "success");
                  }}
                  className="p-2 rounded-lg text-purple-400 hover:bg-purple-600/20 transition-colors"
                  title="Delete"
                >
                  <Image
                    src={"/image/tablevector/bin.png"}
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
      <PopupWrapper isOpen={isPopupOpen}>
        <BeatsDialogDetails onClose={handleClosePopup} beat={selectedEntry} />
      </PopupWrapper>

      {
        deletePopUp &&
        <ConfirmPopUp 
          title={"Delete Custom beat?"} 
          message={"Are you sure you want to delete this custom beat?"} 
          onCancel={()=>setDeletePopUp(false)} 
          onConfirm={()=>{
            setDeletePopUp(false);
            deleteBeat(selectedEntryId!);
          }}
        />
      }

      {
        isLoading && <LoadingEffect/>
      }
    </div>
  );
};
