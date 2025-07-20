"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { FiSave, FiTrash2, FiUpload } from "react-icons/fi";
import { MdInsertPhoto } from "react-icons/md";
import { uploadBeat, uploadProduct } from "./action";

type FormData = {
  beatTitle: string;
  price: string;
  genre: string;
  mood: string;
  description: string;
  cover: File | null;
  audio: File | null;
};

export default function BeatForm({
  genres,
}: {
  genres: { id: number; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

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

  const coverFile = watch("cover");
  const audioFile = watch("audio");

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);

  const openCoverDialog = () => coverInputRef.current?.click();
  const openAudioDialog = () => audioInputRef.current?.click();

  const removeAudio = () => setValue("audio", null);

  const onSubmit = async (data: FormData) => {
    console.log(selectedGenreId?.toString());
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.beatTitle);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("category_id", "1");
      //eslint-disable-next-line
      formData.append("subCategory_id", selectedGenreId?.toString()!);
      formData.append("user_id", "1");
      formData.append("product_type", "regular");

      if (coverFile) formData.append("images", coverFile);

      const result = await uploadProduct(formData);

      if (result.id && audioFile) {
        const audioFormData = new FormData();
        audioFormData.append("product_id", result.id.toString());
        audioFormData.append("audio", audioFile);
        await uploadBeat(audioFormData);
      }

      alert("Product uploaded");
      reset();
      setSelectedGenreId(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl font-michroma mx-auto p-6 bg-[#1E293B]  border border-gray-700 text-white">
      <h2 className="flex items-center mb-6 text-2xl font-semibold">
        <FaUpload className="mr-2" /> Upload New Beat
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  alt="Cover Preview"
                  fill
                  style={{ objectFit: "cover" }}
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
                setValue("cover", file, { shouldValidate: true });
              }}
            />

            <div className="flex-1 space-y-2">
              <button
                type="button"
                onClick={openAudioDialog}
                className="w-full bg-custom text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center transition duration-200"
              >
                <FiUpload className="mr-2" /> Upload Beat Audio
              </button>

              <button
                type="button"
                onClick={removeAudio}
                className="w-full bg-red-500 border border-gray-600 text-gray-300 hover:bg-gray-600 py-2 px-4 rounded-lg font-medium flex items-center justify-center transition duration-200"
              >
                <FiTrash2 className="mr-2" /> Delete Beat Audio
              </button>

              {audioFile && (
                <p className="text-gray-300 truncate max-w-[200px]">
                  Selected audio: {audioFile.name}
                </p>
              )}
            </div>

            <input
              type="file"
              accept="audio/*"
              ref={audioInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setValue("audio", file, { shouldValidate: true });
              }}
            />
          </div>

          {audioFile && (
            <audio
              controls
              src={URL.createObjectURL(audioFile)}
              className="mt-4 w-full"
            />
          )}
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

                const selectedGenre = genres?.find((g) => g.id === selectedId);
                if (selectedGenre) {
                  setValue("genre", selectedGenre.name, {
                    shouldValidate: true,
                  });
                }
              }}
              className="w-full bg-[#1E293B] border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none py-2 px-3 rounded-lg transition-colors duration-200"
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
            register={register}
            error={errors.price?.message}
            rules={{ required: "Price is required" }}
          />

          <InputField
            label="Mood"
            placeholder="Set the mood of the beat"
            name="mood"
            register={register}
            error={errors.mood?.message}
          />
        </div>

        <TextareaField
          label="Description"
          placeholder="Describe your beat in a few words"
          name="description"
          register={register}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-custom text-white py-3 rounded-lg font-semibold flex items-center justify-center transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <svg
              className="w-5 h-5 mr-2 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
            </svg>
          ) : (
            <FiSave className="mr-2" />
          )}
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

const InputField = ({
  label,
  placeholder,
  name,
  register,
  error,
  rules,
}: {
  label: string;
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
      {...register(name, rules)}
      className="w-full bg-[#162133] border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none py-2 px-3 rounded-lg transition-colors duration-200"
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
      className="w-full bg-[#162133] border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none py-2 px-3 rounded-lg transition-colors duration-200 resize-none"
    />
  </div>
);
