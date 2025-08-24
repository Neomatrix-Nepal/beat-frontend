"use client";
import { formatDateTime } from "@/src/lib/utils";
import { BeatsTableProps } from "@/src/types";
import { Edit, Pencil, Play, Trash } from "lucide-react";
import React, { useState } from "react";
import LoadingEffect from "../loadingEffect";
import ConfirmPopUp from "../ui/confirmPopUp";
import CustomAudioPlayer from "../HLSAudioPlayer";

  const genreColors: Record<string, string> = {
    chill: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "R&B": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Hip Hop": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Pop: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  };

export const BeatsTable: React.FC<BeatsTableProps> = ({
  beats,
  onEditBeat,
  onDeleteBeat,
}) => {
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBeatId, setSelectedBeatId] = useState<string | null>();

  const deleteBeat = async (id: string) => {
    setIsLoading(true);
    try {
      await Promise.resolve(onDeleteBeat(id));
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedBeatId(null);
      setIsLoading(false);
    }
  };

  if (beats.length === 0) return null;
  return (
    <div className="bg-[#101828] rounded-xl border border-[#1D2939] overflow-hidden font-michroma">
      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto text-sm">
        <table className="w-full">
          <thead className="bg-[#1A2233] text-[#E4E4E7] border-b border-[#2C3A4F]">
            <tr>
              <th className="text-center p-4 text-slate-300 font-semibold">
                Id
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Title
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Genre
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Price
              </th>
              <th className="text-center p-4 text-slate-300 font-semibold">
                Producer Id
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Upload Date
              </th>
              <th className="text-left p-4 text-slate-300 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {beats.length > 0 &&
              beats?.map((beat, index) => (
                <tr
                  key={beat.id}
                  className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                    index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
                  }`}
                >
                  <td className="p-4 text-white font-medium">
                    {beat?.id || ""}
                  </td>
                  <td className="p-4 text-white font-medium">
                    {beat?.name || ""}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        genreColors[beat.subCategory?.name] ||
                        "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {beat?.subCategory?.name || ""}
                    </span>
                  </td>
                  <td className="p-4 text-white font-semibold">
                    ${beat.price}
                  </td>
                  <td className="p-4 text-slate-300 text-center">{beat.user_id}</td>
                  <td className="p-4 text-slate-400">
                    {formatDateTime(beat.updated_at)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="cursor-pointer px-1 text-white bg-black hover:bg-purple-700 rounded-lg transition-colors duration-300">
                        <CustomAudioPlayer
                          audioSrc={
                            process.env.NEXT_PUBLIC_API_URL +
                            beat.digital_assets[0].metadata.playlistUrl
                          }
                        />
                      </div>
                      <button
                        onClick={() => {
                          onEditBeat(beat);
                        }}
                        className="cursor-pointer p-2 text-white bg-black hover:bg-purple-700 rounded-lg transition-colors duration-300"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBeatId(beat.id.toString());
                          setDeletePopUp(true);
                        }}
                        className="cursor-pointer p-2 bg-black rounded-lg text-red-500 hover:bg-red-600/20 transition-colors"
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
        {beats.length > 0 &&
          beats?.map((beat) => (
            <div
              key={beat.id}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-white font-medium break-all">{beat?.name}</h3>
                    <p className="text-slate-400 text-sm">{"Cute Boka"}</p>
                  </div>
                </div>
                <span className="text-white font-semibold">${beat.price}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      genreColors[beat?.subCategory?.name] ||
                      "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {beat?.subCategory?.name || ""}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {formatDateTime(beat.updated_at)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="cursor-pointer px-1 text-white bg-black hover:bg-purple-700 rounded-lg transition-colors duration-300">
                    <CustomAudioPlayer
                      audioSrc={
                        process.env.NEXT_PUBLIC_API_URL +
                        beat.digital_assets[0].metadata.playlistUrl
                      }
                    />
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        onEditBeat(beat);
                      }}
                      className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBeatId(beat.id.toString());
                        setDeletePopUp(true);
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {deletePopUp && (
        <ConfirmPopUp
          title={"Delete Beat?"}
          message={"Are you sure you want to delete this beat?"}
          onCancel={() => setDeletePopUp(false)}
          onConfirm={() => {
            setDeletePopUp(false);
            deleteBeat(selectedBeatId!);
          }}
        />
      )}

      {isLoading && <LoadingEffect />}
    </div>
  );
};
