"use client";

import {
  updateProduct,
  uploadMusic,
  uploadProduct,
} from "@/src/app/(protected_routes)/dashboard/beats_manager/action";
import { Product } from "@/src/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { FiSave, FiTrash2, FiUpload, FiX, FiFolder } from "react-icons/fi";
import { MdInsertPhoto } from "react-icons/md";
import AudioPlayer from "../HLSAudioPlayer";
import { useSession } from "next-auth/react";
import MediaPickerModal from "../shared/MediaPickerModal";
import { MediaItem } from "@/src/app/(protected_routes)/dashboard/media_manager/action";

export type FormData = {
  beatTitle: string;
  price: string;
  genre: string;
  mood: string;
  description: string;
  cover: File | null;
  cover_path?: string;
  audio: File | null;
  media_path?: string;
  selectedMediaName?: string;
  selectedCoverName?: string;
  is_special: boolean;
  is_trending: boolean;
  show_on_homepage: boolean;
  duplicateMedia: boolean;
};

type BeatFormModalProps = {
  genres: { id: number; name: string }[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: Product | null;
};

export default function BeatFormModal({
  genres,
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: BeatFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [pickerType, setPickerType] = useState<"audio" | "image">("audio");

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      beatTitle: "",
      price: "",
      genre: "",
      mood: "",
      description: "",
      cover: null,
      cover_path: "",
      audio: null,
      media_path: "",
      selectedMediaName: "",
      selectedCoverName: "",
      is_special: false,
      is_trending: false,
      show_on_homepage: false,
      duplicateMedia: true,
    },
  });

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);

  const coverFile = watch("cover");
  const audioFile = watch("audio");
  const mediaPath = watch("media_path");
  const coverPath = watch("cover_path");
  const selectedMediaName = watch("selectedMediaName");


  useEffect(() => {
    if (!initialData) {
      reset();
      setSelectedGenreId(null);
      setPreviewCover(null);
      setPreviewAudio(null);
      return;
    }

    setPreviewCover(null);
    setPreviewAudio(null);

    const genreObj = genres.find(
      (g) => g.name === initialData.subCategory?.name
    );
    if (genreObj) {
      setSelectedGenreId(genreObj.id);
      setValue("genre", genreObj.name);
    }

    setValue("beatTitle", initialData.name);
    setValue("price", initialData.price);
    setValue("mood", initialData.mood ?? "");
    setValue("description", initialData.description ?? "");
    setValue("is_special", (initialData as any).is_special ?? false);
    setValue("is_trending", (initialData as any).is_trending ?? false);
    setValue("show_on_homepage", (initialData as any).show_on_homepage ?? false);
    setValue("duplicateMedia", (initialData as any).duplicateMedia ?? true);

    const imageUrl = initialData.images?.[0]?.url;
    if (typeof imageUrl === "string" && imageUrl.length > 0) {
      setPreviewCover(imageUrl.startsWith('http') ? imageUrl : (process.env.NEXT_PUBLIC_API_URL + "/" + imageUrl));
    }

    const playlistUrl = initialData.digital_assets?.[0]?.metadata?.playlistUrl;
    if (typeof playlistUrl === "string" && playlistUrl.length > 0) {
      setPreviewAudio(process.env.NEXT_PUBLIC_API_URL + playlistUrl);
    }
  }, [initialData, genres, reset, setValue]);

  const openCoverDialog = () => coverInputRef.current?.click();
  const openAudioDialog = () => audioInputRef.current?.click();

  const removeAudio = () => {
    setValue("audio", null);
    setValue("media_path", "");
    setValue("selectedMediaName", "");
    setPreviewAudio(null);
  };

  const removeCover = () => {
    setValue("cover", null);
    setValue("cover_path", "");
    setValue("selectedCoverName", "");
    setPreviewCover(null);
  };

  const handleMediaSelect = (item: MediaItem) => {
    // Standardize path to match multer (starts with uploads/, no leading slash)
    const standardizedPath = item.url ? item.url.replace(/^\//, "") : item.path;
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    const fullUrl = item.url ? (item.url.startsWith("http") ? item.url : `${apiBase}${item.url.startsWith("/") ? "" : "/"}${item.url}`) : "";

    if (pickerType === "audio") {
      setValue("audio", null);
      setValue("media_path", standardizedPath);
      setValue("selectedMediaName", item.name);
      setPreviewAudio(fullUrl);
    } else {
      setValue("cover", null);
      setValue("cover_path", standardizedPath);
      setValue("selectedCoverName", item.name);
      setPreviewCover(fullUrl);
    }
  };

  const handleClose = () => {
    reset();
    setPreviewCover(null);
    setPreviewAudio(null);
    setSelectedGenreId(null);
    onClose();
  };
  const onSubmit = async (data: FormData) => {
    if (!session) {
      return toast.error("session timeout please login again");
    }

    if (!selectedGenreId) {
      return toast.error("Please select a genre");
    }

    if (!data.audio && !data.media_path && !previewAudio) {
      return toast.error("Please upload or select a music file");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.beatTitle);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("category_id", "1");
      formData.append("subCategory_id", selectedGenreId.toString());
      formData.append("user_id", session?.user.id);
      formData.append("product_type", "digital-asset");
      formData.append("is_special", String(data.is_special));
      formData.append("is_trending", String(data.is_trending));
      formData.append("show_on_homepage", String(data.is_trending)); // Use is_trending for both
      formData.append("mood", data.mood);
      formData.append("duplicateMedia", String(data.duplicateMedia));

      if (data.cover instanceof File) {
        formData.append("images", data.cover);
      } else if (data.cover_path) {
        formData.append("cover_path", data.cover_path);
      }

      let result;

      if (initialData) {
        result = await updateProduct(
          formData,
          initialData.id.toString(),
          session?.user?.tokens?.accessToken as string
        );
      } else {
        result = await uploadProduct(
          formData,
          session?.user?.tokens?.accessToken as string
        );
      }

      if (result?.id && (data.audio instanceof File || data.media_path)) {
        const audioFormData = new FormData();
        audioFormData.append("product_id", result.id.toString());
        if (data.audio instanceof File) {
          audioFormData.append("audio", data.audio);
        } else if (data.media_path) {
          audioFormData.append("media_path", data.media_path);
        }
        
        await uploadMusic(
          audioFormData,
          session?.user?.tokens?.accessToken as string
        );
      }

      toast.success(
        initialData
          ? "Beat updated successfully!"
          : "Beat uploaded successfully!"
      );
      if (onSuccess) onSuccess();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 mx-3 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-[#1E293B] w-full max-w-4xl rounded-xl p-6 relative text-white overflow-y-auto max-h-[90vh] border border-gray-700">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-red-500"
          >
            <FiX size={20} />
          </button>

          <h2 className="flex items-center mb-6 text-2xl font-semibold">
            <FaUpload className="mr-2" />
            {initialData ? "Edit Beat" : "Upload New Beat"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Upload Inputs */}
            <div>
              <p className="mb-2 text-sm text-gray-400">
                Upload Cover & Beat Audio
              </p>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-2">
                  <div
                    onClick={openCoverDialog}
                    className="w-32 h-32 bg-[#162133] rounded-lg cursor-pointer overflow-hidden relative flex items-center justify-center border border-gray-600"
                  >
                    {coverFile ? (
                      <Image
                        src={URL.createObjectURL(coverFile)}
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                    ) : previewCover ? (
                      <Image
                        src={previewCover}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <MdInsertPhoto className="w-10 h-10 text-gray-500 mx-auto" />
                        <span className="text-[8px] text-gray-400 uppercase">Click to Upload</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    {/* <button
                        type="button"
                        onClick={() => {
                            setPickerType("image");
                            setShowMediaPicker(true);
                        }}
                        className="bg-purple-600/20 text-purple-400 border border-purple-500/30 py-1.5 px-2 rounded-lg flex items-center justify-center text-[10px] hover:bg-purple-600/30 transition-colors"
                    >
                        <FiFolder className="mr-1" /> Media Picker
                    </button> */}
                    <button
                        type="button"
                        onClick={removeCover}
                        className="bg-red-500/10 text-red-500 border border-red-500/20 py-1.5 px-2 rounded-lg flex items-center justify-center text-[10px] hover:bg-red-500/20 transition-colors"
                    >
                        <FiTrash2 className="mr-1" /> Clear
                    </button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={coverInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                          removeCover();
                          setPreviewCover(URL.createObjectURL(file));
                          setValue("cover", file, { shouldValidate: true });
                      }
                    }}
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => {
                        removeAudio();
                        openAudioDialog();
                        }}
                        className="bg-custom text-white py-2 px-4 rounded-lg flex items-center justify-center text-sm"
                    >
                        <FiUpload className="mr-2" /> Upload Audio
                    </button>
                    {/* <button
                        type="button"
                        onClick={() => {
                            setPickerType("audio");
                            setShowMediaPicker(true);
                        }}
                        className="bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center text-sm hover:bg-purple-700 transition-colors"
                    >
                        <FiFolder className="mr-2" /> Select from Media
                    </button> */}
                    <button
                        type="button"
                        onClick={removeAudio}
                        className="bg-red-500/10 text-red-500 border border-red-500/20 py-2 px-4 rounded-lg flex items-center justify-center text-sm hover:bg-red-500/20 transition-colors"
                    >
                        <FiTrash2 className="mr-2" /> Clear Audio
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {(audioFile || selectedMediaName || previewAudio) && (
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                        <p className="text-gray-300 truncate text-[10px] mb-2 uppercase tracking-widest font-bold">
                          <span className="text-purple-400">Active Track:</span> {audioFile?.name || selectedMediaName || "Streaming from server"}
                        </p>
                        {audioFile ? (
                        <audio
                            controls
                            src={URL.createObjectURL(audioFile)}
                            className="w-full h-8"
                        />
                        ) : previewAudio ? (
                        <AudioPlayer audioSrc={previewAudio} />
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>

                <input
                  type="file"
                  accept="audio/*"
                  ref={audioInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      removeAudio();
                      setPreviewAudio(URL.createObjectURL(file));
                      setValue("audio", file, { shouldValidate: true });
                    }
                  }}
                />
              </div>
            </div>

            <InputField
              label="Beat Title"
              placeholder="Enter beat name"
              name="beatTitle"
              register={register}
              error={errors.beatTitle?.message}
              rules={{ required: "Beat Title is required" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Genre
                </label>
                <select
                  value={selectedGenreId ?? ""}
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    setSelectedGenreId(selectedId);
                    const selectedGenre = genres.find((g) => g.id === selectedId);
                    if (selectedGenre) {
                      setValue("genre", selectedGenre.name, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  className="w-full bg-[#1E293B] border border-gray-600 text-white py-2 px-3 rounded-lg"
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
                  {genres.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.genre.message}
                  </p>
                )}
              </div>

              <InputField
                label="Price"
                placeholder="Set beat price"
                name="price"
                type="number"
                register={register}
                error={errors.price?.message}
                rules={{ required: "Price is required" }}
              />
              <InputField
                label="Mood"
                placeholder="Mood of beat"
                name="mood"
                register={register}
                error={errors.mood?.message}
              />
            </div>

            <TextareaField
              label="Description"
              placeholder="Describe your beat"
              name="description"
              register={register}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_special"
                  {...register("is_special")}
                  className="w-4 h-4 rounded border-gray-600 bg-[#162133] text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="is_special" className="text-sm font-medium text-gray-300 cursor-pointer">
                  Special Beat (Glow effect)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_trending"
                  {...register("is_trending")}
                  className="w-4 h-4 rounded border-gray-600 bg-[#162133] text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="is_trending" className="text-sm font-medium text-gray-300 cursor-pointer">
                  Trending Track (Will show on home page)
                </label>
              </div>

              {/* <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="duplicateMedia"
                  {...register("duplicateMedia")}
                  className="w-4 h-4 rounded border-gray-600 bg-[#162133] text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="duplicateMedia" className="text-sm font-medium text-gray-300 cursor-pointer">
                  Duplicate Media (Copy to product folder)
                </label>
              </div> */}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-custom text-white py-3 rounded-lg flex items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                </svg>
              ) : (
                <FiSave className="mr-2" />
              )}
              {loading ? "Processing..." : initialData ? "Update Beat" : "Save Beat"}
            </button>
          </form>
        </div>
      </div>

      <MediaPickerModal 
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaSelect}
        allowedTypes={pickerType === "audio" ? ["mp3", "wav", "ogg", "flac"] : ["jpg", "jpeg", "png", "webp"]}
      />
    </>
  );
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  name,
  register,
  error,
  rules,
}: {
  label: string;
  type?: string;
  placeholder: string;
  name: keyof FormData;
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
  rules?: object;
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-300">
      {label}
    </label>
    <input
      placeholder={placeholder}
      type={type}
      {...register(name, rules)}
      className="w-full bg-[#162133] border border-gray-600 text-white py-2 px-3 rounded-lg"
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const TextareaField = ({
  label,
  placeholder,
  name,
  register,
}: {
  label: string;
  placeholder: string;
  name: keyof FormData;
  register: ReturnType<typeof useForm<FormData>>["register"];
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-300">
      {label}
    </label>
    <textarea
      placeholder={placeholder}
      {...register(name)}
      rows={4}
      className="w-full bg-[#162133] border border-gray-600 text-white py-2 px-3 rounded-lg resize-none"
    />
  </div>
);
