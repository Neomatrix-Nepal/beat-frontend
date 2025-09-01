"use client";

import { uploadMusic } from "@/src/app/(protected_routes)/dashboard/beats_manager/action";
import { Setting } from "@/src/types/setting.type";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { updateSettings } from "./action";

export default function SettingsUI({ settings }: { settings: Setting | null }) {
  const [form, setForm] = useState<Setting | null>(settings);
  const [loading, setLoading] = useState(false);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  const { data: session } = useSession();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!form) return;
    setForm({
      ...form,
      [name]: e.target.type === "number" ? parseFloat(value).toFixed(2) : value,
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

  const handleSave = async () => {
    if (!form) return;
    setLoading(true);

    try {
      let beforeAssetId: string | null = null;
      if (beforeFile) {
        const audioFormData = new FormData();
        audioFormData.append("audio", beforeFile);
        const { assets } = await uploadMusic(
          audioFormData,
          session?.user?.tokens?.accessToken as string
        );
        if (!assets) return toast.error("Failed to upload audio");
        beforeAssetId = assets[0].id;
      }

      let afterAssetId: string | null = null;
      if (afterFile) {
        const audioFormData = new FormData();
        audioFormData.append("audio", afterFile);
        const { assets } = await uploadMusic(
          audioFormData,
          session?.user?.tokens?.accessToken as string
        );
        if (!assets) return toast.error("Failed to upload audio");
        afterAssetId = assets[0].id;
      }

      const updatedForm = {
        ...form,
        beforeMixingId: beforeAssetId ?? form.beforeMixingId,
        afterMixingId: afterAssetId ?? form.afterMixingId,
      };

      const { id } = await updateSettings(
        settings?.id.toString() as string,
        {
          tax: updatedForm.tax,
          commission: updatedForm.commission,
          beforeMixingId: updatedForm?.beforeMixingId?.toString() || null,
          afterMixingId: updatedForm?.afterMixingId?.toString() || null,
          customBeatsBasePrice: updatedForm?.customBeatsBasePrice,
          mixingProBasePrice: updatedForm?.mixingProBasePrice,
          studioOneHourPrice: updatedForm?.studioOneHourPrice,
          studioTwoHourPrice: updatedForm?.studioTwoHourPrice,
        },
        session?.user?.tokens?.accessToken as string
      );

      if (!id) return toast.error("Failed to update settings!");
      toast.success("Settings updated successfully!");
      setBeforeFile(null);
      setAfterFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-michroma">
      <h1 className="text-xl font-bold mb-6">Platform Settings</h1>

      <div className="bg-slate-800 p-6 rounded-lg space-y-4">
        {/* Commission & Tax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Commission %</label>
            <input
              type="number"
              name="commission"
              value={form?.commission}
              min={0}
              max={100}
              step={0.01}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700"
            />
          </div>
          <div className="flex flex-col">
            <label>Tax %</label>
            <input
              type="number"
              name="tax"
              value={form?.tax}
              min={0}
              max={100}
              step={0.01}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700"
            />
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label>Mixing Pro Base Price</label>
            <input
              type="number"
              name="mixingProBasePrice"
              value={form?.mixingProBasePrice}
              min={0}
              step={0.01}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700"
            />
          </div>
          <div className="flex flex-col">
            <label>Custom Beats Base Price</label>
            <input
              type="number"
              name="customBeatsBasePrice"
              value={form?.customBeatsBasePrice}
              min={0}
              step={0.01}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700"
            />
          </div>
          <div className="flex flex-col">
            <label>Studio 1 Hour Price</label>
            <input
              type="number"
              name="studioOneHourPrice"
              value={form?.studioOneHourPrice}
              min={0}
              step={0.01}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700"
            />
          </div>
          <div className="flex flex-col">
            <label>Studio 2 Hour Price</label>
            <input
              type="number"
              name="studioTwoHourPrice"
              value={form?.studioTwoHourPrice}
              min={0}
              step={0.01}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700"
            />
          </div>
        </div>

        {/* Digital Assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Before Mixing Asset</label>
            {form?.beforeMixing || beforeFile ? (
              <div className=" items-center space-x-2">
                <span>
                  {beforeFile?.name ??
                    form?.beforeMixing?.id ??
                    "Existing file"}
                </span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileSelect(e, "before")}
                  className="p-2 rounded bg-slate-700"
                />
              </div>
            ) : (
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileSelect(e, "before")}
                className="p-2 rounded bg-slate-700"
              />
            )}
          </div>

          {/* After Mixing Asset */}
          <div className="flex flex-col">
            <label>After Mixing Asset</label>
            {form?.afterMixing || afterFile ? (
              <div className="items-center space-x-2">
                <span>
                  {afterFile?.name ?? form?.afterMixing?.id ?? "Existing file"}
                </span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileSelect(e, "after")}
                  className="p-2 rounded bg-slate-700"
                />
              </div>
            ) : (
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileSelect(e, "after")}
                className="p-2 rounded bg-slate-700"
              />
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 bg-custom px-6 py-2 rounded hover:scale-105 transition-transform disabled:opacity-50"
        >
          {loading ? "Updating. Please Wait...." : "Update Settings"}
        </button>
      </div>
    </div>
  );
}
