"use client";

import { uploadMusic } from "@/src/app/(protected_routes)/dashboard/beats_manager/action";
import { Setting } from "@/src/types/setting.type";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateSettings, getGenres, addGenreAction, updateGenreAction, deleteGenreAction, getCategories } from "./action";
import CustomAudioPlayer from "@/src/components/HLSAudioPlayer";
import { FiUpload, FiX, FiMusic, FiSettings, FiDollarSign, FiPercent, FiLoader, FiPlus, FiTrash2, FiEdit2, FiCheck, FiTrendingUp } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { baseURL as API_URL } from "@/src/hooks/useApi";
import { Genre } from "@/src/types/genres.type";
import { Button } from "@/src/components/ui/button";
import ConfirmPopUp from "@/src/components/ui/confirmPopUp";

export default function SettingsUI({ settings }: { settings: Setting | null }) {
  const [form, setForm] = useState<Setting | null>(settings);
  const [loading, setLoading] = useState(false);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [musicCategoryId, setMusicCategoryId] = useState<number | null>(null);
  const [newGenreName, setNewGenreName] = useState("");
  const [isTrendingOnly, setIsTrendingOnly] = useState(false);
  const [editingGenre, setEditingGenre] = useState<{ id: number; name: string } | null>(null);
  const [fetchingGenres, setFetchingGenres] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState<number | null>(null);

  useEffect(() => {
    setForm(settings);
    if (session?.user?.tokens?.accessToken) {
      fetchMusicCategory();
    }
  }, [settings, session]);

  useEffect(() => {
    if (session?.user?.tokens?.accessToken) {
      fetchGenres();
    }
  }, [session, isTrendingOnly]);

  const fetchMusicCategory = async () => {
    try {
      const categories = await getCategories(session?.user?.tokens?.accessToken as string);
      const musicCat = categories.find((c: any) => c.name.toLowerCase() === "music");
      if (musicCat) setMusicCategoryId(musicCat.id);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchGenres = async () => {
    setFetchingGenres(true);
    try {
      const data = await getGenres(
        session?.user?.tokens?.accessToken as string,
        "music",
        isTrendingOnly ? true : undefined
      );
      setGenres(data || []);
    } catch (error) {
      console.error("Failed to fetch genres", error);
      toast.error("Failed to load genres");
    } finally {
      setFetchingGenres(false);
    }
  };

  const handleAddGenre = async () => {
    if (!newGenreName.trim() || !musicCategoryId) return;
    try {
      await addGenreAction(session?.user?.tokens?.accessToken as string, {
        name: newGenreName.trim(),
        category_id: musicCategoryId,
        slug: newGenreName.trim().toLowerCase().replace(/\s+/g, "-"),
      });
      setNewGenreName("");
      toast.success("Genre added!");
      fetchGenres();
    } catch (error) {
      toast.error("Failed to add genre");
    }
  };

  const handleUpdateGenre = async (
    id: number,
    data: { name?: string; is_trending?: boolean; slug?: string }
  ) => {
    try {
      // If name is updated, auto-generate slug if not provided
      const updateData = { ...data };
      if (data.name && !data.slug) {
        updateData.slug = data.name.toLowerCase().replace(/\s+/g, "-");
      }

      await updateGenreAction(
        session?.user?.tokens?.accessToken as string,
        id,
        updateData
      );
      toast.success("Genre updated!");
      setEditingGenre(null);
      fetchGenres();
    } catch (error) {
      toast.error("Failed to update genre");
    }
  };

  const handleDeleteGenre = async () => {
    if (!genreToDelete) return;
    try {
      await deleteGenreAction(session?.user?.tokens?.accessToken as string, genreToDelete);
      toast.success("Genre deleted!");
      fetchGenres();
    } catch (error) {
      toast.error("Failed to delete genre");
    } finally {
      setGenreToDelete(null);
    }
  };

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
        minPayoutThreshold: form.minPayoutThreshold?.toString(),
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
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs text-gray-500 uppercase">Min Payout Threshold</label>
                    <input
                      type="number"
                      name="minPayoutThreshold"
                      value={form?.minPayoutThreshold}
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
                          <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); setBeforeFile(null); }} className="h-6 w-6 rounded-full hover:bg-white/10">
                            <FiX />
                          </Button>
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
                          <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); setAfterFile(null); }} className="h-6 w-6 rounded-full hover:bg-white/10">
                            <FiX />
                          </Button>
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

            {/* Genres Management Section */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FiMusic className="text-blue-400" /> Music Genres
                </h2>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isTrendingOnly}
                      onChange={(e) => setIsTrendingOnly(e.target.checked)}
                      className="hidden"
                    />
                    <div className={`w-8 h-4 rounded-full transition-all relative ${isTrendingOnly ? "bg-blue-500" : "bg-gray-700"}`}>
                      <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isTrendingOnly ? "left-5" : "left-1"}`} />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white transition-colors">Trending Only</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                {/* Add Genre Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add new genre..."
                    value={newGenreName}
                    onChange={(e) => setNewGenreName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddGenre()}
                    className="flex-1 bg-[#121212] border border-[#333333] rounded-md p-3 focus:border-blue-500 outline-none transition-all text-sm tracking-wider font-michroma"
                  />
                  <Button
                    onClick={handleAddGenre}
                    disabled={!newGenreName.trim() || !musicCategoryId}
                    className="h-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 px-6 flex items-center gap-2"
                  >
                    <FiPlus />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Add</span>
                  </Button>
                </div>

                {/* Genres List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {fetchingGenres ? (
                    <div className="col-span-full py-8 flex justify-center">
                      <FiLoader className="animate-spin text-blue-500 text-xl" />
                    </div>
                  ) : genres.length > 0 ? (
                    genres.map((genre) => (
                      <div
                        key={genre.id}
                        className={`bg-[#121212] border p-3 rounded-lg flex items-center justify-between group transition-all ${
                          genre.is_trending ? "border-blue-500/30 bg-blue-500/5" : "border-[#333333] hover:border-blue-500/20"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          {editingGenre?.id === genre.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                autoFocus
                                type="text"
                                value={editingGenre.name}
                                onChange={(e) => setEditingGenre({ ...editingGenre, name: e.target.value })}
                                onKeyDown={(e) => e.key === "Enter" && handleUpdateGenre(genre.id, { name: editingGenre.name })}
                                className="w-full bg-transparent border-b border-blue-500 outline-none text-xs text-blue-400 font-bold py-1"
                              />
                              <Button variant="ghost" size="icon" onClick={() => handleUpdateGenre(genre.id, { name: editingGenre.name })} className="h-6 w-6 text-green-500 hover:bg-green-500/10">
                                <FiCheck />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => setEditingGenre(null)} className="h-6 w-6 text-red-500 hover:bg-red-500/10">
                                <FiX />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-[11px] font-bold tracking-wider truncate">
                                {genre.name}
                              </span>
                              {genre.is_trending && (
                                <div className="px-1.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                                  <FiTrendingUp className="text-blue-500 text-[10px]" title="Trending" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUpdateGenre(genre.id, { is_trending: !genre.is_trending })}
                            className={`h-8 w-8 transition-colors ${genre.is_trending ? "text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-400" : "text-gray-500 hover:bg-gray-500/10 hover:text-gray-300"}`}
                            title={genre.is_trending ? "Remove from Trending" : "Mark as Trending"}
                          >
                            <FiTrendingUp className="text-xs" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingGenre({ id: genre.id, name: genre.name })}
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <FiEdit2 className="text-xs" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setGenreToDelete(genre.id)}
                            className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          >
                            <FiTrash2 className="text-xs" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-gray-500 text-[10px] uppercase tracking-[0.2em] bg-white/5 rounded-xl border border-dashed border-white/10">
                      No genres found
                    </div>
                  )}
                </div>
              </div>

            <div className="pt-8 flex justify-end gap-4 border-t border-white/10">
              <Button
                onClick={handleSave}
                disabled={loading}
                className={`px-12 py-6 rounded-md font-bold uppercase tracking-widest transition-all ${loading
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
              </Button>
            </div>
          </div>
        </div>
      </div>

      {genreToDelete && (
        <ConfirmPopUp
          title="Delete Genre"
          message="Are you sure you want to delete this genre? This action cannot be undone."
          onCancel={() => setGenreToDelete(null)}
          onConfirm={handleDeleteGenre}
        />
      )}
    </div>
    </div>
  );
}
