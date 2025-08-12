"use client";
import PopupWrapper from "@/src/components/shared/PopupWrapper";
import { formatDateTime } from "@/src/lib/utils";
import { Order } from "@/src/types";
import { Check, Eye, Trash } from "lucide-react";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import CustomerOrderDetails from "../dialog/customerOrderDialog";
import LoadingEffect from "../loadingEffect";
import ConfirmPopUp from "../ui/confirmPopUp";

interface CustomerOrderTableProps {
  entries: Order[];
  onDeleteEntry: (id: string) => void;
  handleChangeStatus: (id: string) => void;
}

const statusStyles = {
  pending: "bg-green-800/20 text-green-400 border-green-800/30",
  completed: "bg-yellow-700/20 text-yellow-400 border-yellow-700/30",
  failed: "bg-red-800/20 text-red-400 border-red-800/30",
};

export const CustomerOrderTable: React.FC<CustomerOrderTableProps> = ({
  entries,
  onDeleteEntry,
  handleChangeStatus,
}) => {
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>();
  const [selectedEntry, setSelectedEntry] = useState<Order | null>(null);

  const handleViewClick = (entry: Order) => {
    setSelectedEntry(entry);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEntry(null);
  };

  const deleteOrder = async (id: string) => {
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
              <th className="text-left p-4">Id</th>
              <th className="text-left p-4">Customer's Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Order Date</th>
              <th className="text-center p-4">Status</th>
              <th className="text-center p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {entries?.map((entry, index) => (
              <tr
                key={entry.id}
                className={`border-b border-[#2C3A4F] hover:bg-[#1A2233]/50 transition-colors ${
                  index % 2 === 0 ? "bg-[#1C2433]" : "bg-[#1A1F2E]"
                }`}
              >
                <td className="p-4 text-white font-medium">{entry.id}</td>
                <td className="p-4 text-white font-medium">
                  {entry.user.fullname}
                </td>
                {/* <td className="p-4 text-white">{entry.}</td> */}
                <td className="p-4 text-white">{entry.amount}</td>
                <td className="p-4 text-white">
                  {formatDateTime(entry.createdAt)}
                </td>
                <td className="p-4 text-center">
                  <div
                    className={`py-2 rounded-sm text-md font-medium border ${
                      statusStyles[entry.status as keyof typeof statusStyles]
                    }`}
                  >
                    {entry.status}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewClick(entry)}
                      className="cursor-pointer p-2 text-white bg-foreground hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <IoMdEye size={16} />
                    </button>
                    <button
                      onClick={() => handleChangeStatus(entry.id.toString())}
                      disabled={entry.status === "completed"}
                      className="cursor-pointer p-2 bg-foreground hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <Check size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEntryId(entry.id.toString());
                        setDeletePopUp(true);
                      }}
                      className="cursor-pointer p-2 bg-black rounded-lg text-purple-400 hover:bg-purple-600/20 transition-colors"
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
                  // checked={entry.selected}
                  // onChange={() => onSelectEntry(entry.id)}
                  className="w-4 h-4 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <div>
                  <h3 className="text-white font-medium">Id: {entry.id}</h3>
                  <h3 className="text-white font-medium">
                    {entry.user.fullname}
                  </h3>
                  {/* <p className="text-white text-sm">Product: {entry.product}</p> */}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-md text-xs font-medium border ${
                  statusStyles[entry.status as keyof typeof statusStyles]
                }`}
              >
                {entry.status}
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-white text-sm">Price: {entry.amount}</p>
              <p className="text-white text-sm">
                Order Date: {entry.createdAt}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewClick(entry)}
                  className="p-2 rounded-lg text-white hover:bg-slate-600/30 transition-colors"
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleChangeStatus(entry.id.toString())}
                  disabled={entry.status === "completed"}
                  className="p-2 rounded-lg text-green-400 hover:bg-green-600/20 transition-colors"
                  title="Mark Sent"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedEntryId(entry.id.toString());
                    setDeletePopUp(true);
                  }}
                  className="cursor-pointer p-2 bg-black rounded-lg text-purple-400 hover:bg-purple-600/20 transition-colors"
                  title="Delete"
                >
                  <Trash size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PopupWrapper isOpen={isPopupOpen}>
        <CustomerOrderDetails
          order={selectedEntry}
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
            deleteOrder(selectedEntryId!);
          }}
        />
      )}

      {isLoading && <LoadingEffect />}
    </div>
  );
};
