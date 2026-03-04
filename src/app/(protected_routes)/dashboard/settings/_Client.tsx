"use client";

import { uploadMusic } from "@/src/app/(protected_routes)/dashboard/beats_manager/action";
import { Setting } from "@/src/types/setting.type";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateSettings } from "./action";
import CustomAudioPlayer from "@/src/components/HLSAudioPlayer";
import { FiUpload, FiX, FiMusic, FiSettings, FiDollarSign, FiPercent, FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SettingsUI({ settings }: { settings: Setting | null }) {
  const [form, setForm] = useState<Setting | null>(settings);
  const [loading, setLoading] = useState(false);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  useEffect(() => {
    if (beforeFile) {
      const url = URL.createObjectURL(beforeFile);
      setBeforePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setBeforePreview(null);
    }
  }, [beforeFile]);

  useEffect(() => {
    if (afterFile) {
      const url = URL.createObjectURL(afterFile);
      setAfterPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAfterPreview(null);
    }
  }, [afterFile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!form) return;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileSelect = (
    e: ChangeEvent<HTMLInputElement>,
    type: "before" | "after"
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (type === "before") setBeforeFile(file);
    else setAfterFile(file);
  };

  const getStreamingUrl = (assetId: string) => {
    return `${API_URL}/stream/${assetId}/playlist.m3u8`;
  };

  const handleSave = async () => {
    if (!form) return;
    setLoading(true);

    try {
      let beforeAssetId = form.beforeMixingId;
      if (beforeFile) {
        const audioFormData = new FormData();
        audioFormData.append("audio", beforeFile);
        const response = await uploadMusic(
          audioFormData,
          session?.user?.tokens?.accessToken as string
        );
        if (!response.assets) return toast.error("Failed to upload before-mixing audio");
        beforeAssetId = response.assets[0].id.toString();
      }

      let afterAssetId = form.afterMixingId;
      if (afterFile) {
        const audioFormData = new FormData();
        audioFormData.append("audio", afterFile);
        const response = await uploadMusic(
          audioFormData,
          session?.user?.tokens?.accessToken as string
        );
        if (!response.assets) return toast.error("Failed to upload after-mixing audio");
        afterAssetId = response.assets[0].id.toString();
      }

      const payload = {
        tax: form.tax?.toString(),
        commission: form.commission?.toString(),
        beforeMixingId: beforeAssetId ? beforeAssetId.toString() : null,
        afterMixingId: afterAssetId ? afterAssetId.toString() : null,
        customBeatsBasePrice: form.customBeatsBasePrice?.toString(),
        mixingProBasePrice: form.mixingProBasePrice?.toString(),
        studioOneHourPrice: form.studioOneHourPrice?.toString(),
        studioTwoHourPrice: form.studioTwoHourPrice?.toString(),
      };

      const result = await updateSettings(
        settings?.id.toString() as string,
        payload,
        session?.user?.tokens?.accessToken as string
      );

      if (!result?.id) return toast.error("Failed to update settings!");

      toast.success("Settings updated successfully!");
      setBeforeFile(null);
      setAfterFile(null);
      router.refresh();

    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-michroma">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FiSettings className="text-2xl text-blue-500" />
            <h1 className="text-2xl font-bold tracking-tight uppercase">Settings</h1>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-blue-400 animate-pulse">
              <FiLoader className="animate-spin" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Processing...</span>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Main Form Section */}
          <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-2xl border border-white/5 space-y-8">
            {/* Financial & Pricing Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2">
                  <FiPercent className="text-blue-400" /> Financial Ratios
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase">Commission %</label>
                    <input
                      type="number"
                      name="commission"
                      value={form?.commission}
                      onChange={handleChange}
                      className="w-full bg-[#121212] border border-[#333333] rounded-md p-3 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase">Tax %</label>
                    <input
                      type="number"
                      name="tax"
                      value={form?.tax}
                      onChange={handleChange}
                      className="w-full bg-[#121212] border border-[#333333] rounded-md p-3 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2">
                  <FiDollarSign className="text-green-400" /> Base Pricing
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase">Mixing Pro</label>
                    <input
                      type="number"
                      name="mixingProBasePrice"
                      value={form?.mixingProBasePrice}
                      onChange={handleChange}
                      className="w-full bg-[#121212] border border-[#333333] rounded-md p-3 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase">Custom Beats</label>
                    <input
                      type="number"
                      name="customBeatsBasePrice"
                      value={form?.customBeatsBasePrice}
                      onChange={handleChange}
                      className="w-full bg-[#121212] border border-[#333333] rounded-md p-3 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase">Studio 1 (hr)</label>
                    <input
                      type="number"
                      name="studioOneHourPrice"
                      value={form?.studioOneHourPrice}
                      onChange={handleChange}
                      className="w-full bg-[#121212] border border-[#333333] rounded-md p-3 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase">Studio 2 (hr)</label>
                    <input
                      type="number"
                      name="studioTwoHourPrice"
                      value={form?.studioTwoHourPrice}
                      onChange={handleChange}
                      className="w-full bg-[#121212] border border-[#333333] rounded-md p-3 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mixing Demos Section - Side by Side */}
            <div className="pt-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2 mb-6">
                <FiMusic className="text-purple-400" /> Mixing Demos Assets
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Before Mixing */}
                <div className="space-y-4">
                  <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Left: Before Mixing</p>
                  {form?.beforeMixing && !beforeFile && (
                    <div className="p-4 bg-[#0d0d0d] rounded-xl border border-white/5">
                      <CustomAudioPlayer
                        title="Current Before Audio"
                        sub="ACTIVE"
                        audioSrc={getStreamingUrl(form.beforeMixing.assetId)}
                      />
                    </div>
                  )}

                  {beforePreview && (
                    <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20">
                      <p className="text-[10px] text-purple-400 uppercase mb-2 font-bold tracking-wider">Preview New File</p>
                      <audio src={beforePreview} controls className="w-full h-10 filter invert opacity-80" />
                    </div>
                  )}

                  <div className="relative group">
                    <input
                      type="file"
                      accept="audio/*"
                      id="before-upload"
                      onChange={(e) => handleFileSelect(e, "before")}
                      className="hidden"
                    />
                    <label
                      htmlFor="before-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                    >
                      {beforeFile ? (
                        <div className="flex items-center gap-3 text-purple-400">
                          <FiMusic className="text-xl" />
                          <span className="text-sm font-medium truncate max-w-[150px]">{beforeFile.name}</span>
                          <button onClick={(e) => { e.preventDefault(); setBeforeFile(null); }} className="p-1 hover:bg-white/10 rounded-full">
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-purple-400 transition-colors text-center">
                          <FiUpload className="text-2xl" />
                          <span className="text-[9px] uppercase font-semibold">Change Before Audio</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Right: After Mixing */}
                <div className="space-y-4">
                  <p className="text-[10px] text-pink-400 font-bold uppercase tracking-widest">Right: After Mixing</p>
                  {form?.afterMixing && !afterFile && (
                    <div className="p-4 bg-[#0d0d0d] rounded-xl border border-white/5">
                      <CustomAudioPlayer
                        title="Current After Audio"
                        sub="ACTIVE"
                        audioSrc={getStreamingUrl(form.afterMixing.assetId)}
                      />
                    </div>
                  )}

                  {afterPreview && (
                    <div className="p-4 bg-pink-500/5 rounded-xl border border-pink-500/20">
                      <p className="text-[10px] text-pink-400 uppercase mb-2 font-bold tracking-wider">Preview New File</p>
                      <audio src={afterPreview} controls className="w-full h-10 filter invert opacity-80" />
                    </div>
                  )}

                  <div className="relative group">
                    <input
                      type="file"
                      accept="audio/*"
                      id="after-upload"
                      onChange={(e) => handleFileSelect(e, "after")}
                      className="hidden"
                    />
                    <label
                      htmlFor="after-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-pink-500/50 hover:bg-pink-500/5 transition-all group"
                    >
                      {afterFile ? (
                        <div className="flex items-center gap-3 text-pink-400">
                          <FiMusic className="text-xl" />
                          <span className="text-sm font-medium truncate max-w-[150px]">{afterFile.name}</span>
                          <button onClick={(e) => { e.preventDefault(); setAfterFile(null); }} className="p-1 hover:bg-white/10 rounded-full">
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-pink-400 transition-colors text-center">
                          <FiUpload className="text-2xl" />
                          <span className="text-[9px] uppercase font-semibold">Change After Audio</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-end gap-4 border-t border-white/10">
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-12 py-4 rounded-md font-bold uppercase tracking-widest transition-all ${loading
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200 active:scale-95 shadow-xl"
                  }`}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <FiLoader className="animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
