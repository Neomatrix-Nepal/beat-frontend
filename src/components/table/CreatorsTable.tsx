import React, { useState } from "react";
import { Eye, Check, Trash, Cross, X } from "lucide-react";
import { CreatorEntry } from "@/src/types";
import { formatDateTime } from "@/src/lib/utils";

interface CreatorTableProps {
  entries: CreatorEntry[];
  onDeleteEntry: (id: number) => void;
  onChangeStatus: (producerRequestId: number, status: string) => void;
  isLoading: boolean;
}

export const CreatorTable: React.FC<CreatorTableProps> = ({
  entries,
  onDeleteEntry,
  onChangeStatus,
  isLoading,
}) => {
  const [selectedEntry, setSelectedEntry] = useState<CreatorEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (entry: CreatorEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  return (
    <div className="bg-[#101828] rounded-xl border border-[#1D2939] overflow-hidden font-michroma">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1A2233] text-[#E4E4E7] border-b border-[#2C3A4F]">
            <tr>
              <th className="text-left p-4">Creator's Name</th>
              <th className="text-left p-4">Producer Style</th>
              <th className="text-left p-4">Social Media URL</th>
              <th className="text-center p-4">Demo Beat</th>
              <th className="text-center p-4">Status</th>
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
                <td className="p-4 text-white font-medium">{entry.name}</td>
                <td className="p-4 pl-16 text-blue-400">{entry.style}</td>
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
                  className={`p-4 text-center font-semibold ${
                    entry.status === "approved"
                      ? "text-green-500"
                      : entry.status === "reject"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
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
                      onClick={() => onDeleteEntry(entry.id)}
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
                  onClick={() => onDeleteEntry(entry.id)}
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
      {isModalOpen && selectedEntry && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#1C2433] w-full max-w-md p-6 rounded-lg text-white relative shadow-lg border border-[#2C3A4F]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg"
              disabled={isLoading}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Method:</span>{" "}
                {selectedEntry.paymentDetail.method}
              </p>
              <p>
                <span className="font-semibold">Full Name:</span>{" "}
                {selectedEntry.paymentDetail.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedEntry.paymentDetail.email}
              </p>
              {selectedEntry.paymentDetail.method === "khalti" && (
                <p>
                  <span className="font-semibold">Khalti Number:</span>{" "}
                  {selectedEntry.paymentDetail.khaltiNumber || "N/A"}
                </p>
              )}
              {selectedEntry.paymentDetail.method === "stripe" && (
                <p>
                  <span className="font-semibold">Stripe Account ID:</span>{" "}
                  {selectedEntry.paymentDetail.stripeAccountId || "N/A"}
                </p>
              )}
              <p>
                <span className="font-semibold">Submitted At:</span>{" "}
                {formatDateTime(selectedEntry.paymentDetail.createdAt)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
