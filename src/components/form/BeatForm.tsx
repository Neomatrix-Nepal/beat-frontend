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
import { FiSave, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import { MdInsertPhoto } from "react-icons/md";
import AudioPlayer from "../HLSAudioPlayer";
import { useSession } from "next-auth/react";

export type FormData = {
  beatTitle: string;
  price: string;
  genre: string;
  mood: string;
  description: string;
  cover: File | null;
  audio: File | null;
};

type BeatFormModalProps = {
  genres: { id: number; name: string }[];
  isOpen: boolean;
  onClose: () => void;
  initialData?: Product | null;
};

export default function BeatFormModal({
  genres,
  isOpen,
  onClose,
  initialData,
}: BeatFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);

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
      audio: null,
    },
  });

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);

  const coverFile = watch("cover");
  const audioFile = watch("audio");

  console.log("========================================")
  console.log(session?.user.id)
  console.log("========================================")

  useEffect(() => {
    if (!initialData) {
      reset();
      setSelectedGenreId(null);
      setPreviewCover(null);
      setPreviewAudio(null);
      return;
    }

    const genreObj = genres.find(
      (g) => g.name === initialData.subCategory?.name
    );
    if (genreObj) {
      setSelectedGenreId(genreObj.id);
      setValue("genre", genreObj.name);
    }

    setValue("beatTitle", initialData.name);
    setValue("price", initialData.price);
    setValue("mood", initialData.name ?? "");
    setValue("description", initialData.description ?? "");

    if (typeof initialData.images[0].url === "string") {
      setPreviewCover(
        process.env.NEXT_PUBLIC_API_URL + "/" + initialData.images[0].url
      );
    }

    if (typeof initialData.digital_assets[0].contentPath === "string") {
      setPreviewAudio(
        process.env.NEXT_PUBLIC_API_URL +
          initialData.digital_assets[0].metadata.playlistUrl
      );
    }
  }, [initialData, genres, reset, setValue]);

  const openCoverDialog = () => coverInputRef.current?.click();
  const openAudioDialog = () => audioInputRef.current?.click();

  const removeAudio = () => {
    setValue("audio", null);
    setPreviewAudio(null);
  };

  const handleClose = () => {
    reset();
    setPreviewCover(null);
    setPreviewAudio(null);
    setSelectedGenreId(null);
    onClose();
  };
  const onSubmit = async (data: FormData) => {
    if(!session){
      return toast.error("session timeout please login again");
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.beatTitle);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("category_id", "1");
      formData.append("subCategory_id", selectedGenreId?.toString()!);
      formData.append("user_id", session?.user.id);
      formData.append("product_type", "digital-asset");

      if (data.cover instanceof File) {
        formData.append("images", data.cover);
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

      if (result?.id && data.audio instanceof File) {
        const audioFormData = new FormData();
        audioFormData.append("product_id", result.id.toString());
        audioFormData.append("audio", data.audio);
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
            <div className="flex space-x-4 items-center">
              <div
                onClick={openCoverDialog}
                className="w-24 h-24 bg-[#162133] rounded-lg cursor-pointer overflow-hidden relative flex items-center justify-center border border-gray-600"
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
                  <MdInsertPhoto className="w-10 h-10 text-gray-500" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={coverInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) setPreviewCover(URL.createObjectURL(file));
                  setValue("cover", file, { shouldValidate: true });
                }}
              />
              <div className="flex-1 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewAudio(null);
                    openAudioDialog();
                  }}
                  className="w-full bg-custom text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <FiUpload className="mr-2" /> Upload Beat Audio
                </button>
                <button
                  type="button"
                  onClick={removeAudio}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <FiTrash2 className="mr-2" /> Delete Beat Audio
                </button>
                {(audioFile || previewAudio) && (
                  <p className="text-gray-300 truncate max-w-[200px]">
                    Selected audio: {audioFile?.name ?? "Preview available"}
                  </p>
                )}
              </div>
              <input
                type="file"
                accept="audio/*"
                ref={audioInputRef}
                className="hidden"
                onChange={(e) => {
                  setPreviewAudio(null);
                  const file = e.target.files?.[0] || null;
                  if (file) setPreviewAudio(URL.createObjectURL(file));
                  setValue("audio", file, { shouldValidate: true });
                }}
              />
            </div>
            {audioFile ? (
              <audio
                controls
                src={URL.createObjectURL(audioFile)}
                className="mt-4 w-full"
              />
            ) : previewAudio ? (
              <AudioPlayer audioSrc={previewAudio} />
            ) : null}
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-custom text-white py-3 rounded-lg flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
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
            {loading ? "Saving..." : initialData ? "Update Beat" : "Save Beat"}
          </button>
        </form>
      </div>
    </div>
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
