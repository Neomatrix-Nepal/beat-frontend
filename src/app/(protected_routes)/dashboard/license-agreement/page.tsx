"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import { agreementTemplate } from "@/src/lib/agreement.template";
import { DigitalAgreement } from "@/src/types/agreement.type";

const defaultValues: DigitalAgreement = {
  price: "",
  currency: "US dollars",
  licenseName: "Exclusive license",
  deliverable: "wav + stems files",
  noticeOfOutstandingClients: false,
  writersShare: "50",
  publishersShare: "50",
  masterRoyalties: "3",
  beatTitle: "",
  producerLegalName: "",
  producerStageName: "",
  producerAddress: "",
  producerCountry: "",
  artistLegalName: "",
  artistStageName: "",
  artistAddress: "",
  artistCountry: "",
};

export default function DigitalAgreementPage() {
  const [form, setForm] = useState(defaultValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm({ ...form, [name]: e.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = async () => {
    if (
      !form.price ||
      !form.beatTitle ||
      !form.producerLegalName ||
      !form.artistLegalName
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      let filledTemplate = agreementTemplate
        .replace(/\[PRICE\]/g, form.price)
        .replace(/\[CURRENCY\]/g, form.currency)
        .replace(/\[LICENSE_NAME\]/g, form.licenseName)
        .replace(/\[DELIVERABLE\]/g, form.deliverable)
        .replace(/\[NOTICE\]/g, form.noticeOfOutstandingClients ? "Yes" : "No")
        .replace(/\[WRITERS_SHARE\]/g, form.writersShare)
        .replace(/\[PUBLISHERS_SHARE\]/g, form.publishersShare)
        .replace(/\[MASTER_ROYALTIES\]/g, form.masterRoyalties)
        .replace(/\[BEAT_TITLE\]/g, form.beatTitle)
        .replace(/\[PRODUCER_LEGAL_NAME\]/g, form.producerLegalName)
        .replace(/\[PRODUCER_STAGE_NAME\]/g, form.producerStageName)
        .replace(/\[PRODUCER_ADDRESS\]/g, form.producerAddress)
        .replace(/\[PRODUCER_COUNTRY\]/g, form.producerCountry)
        .replace(/\[ARTIST_LEGAL_NAME\]/g, form.artistLegalName)
        .replace(/\[ARTIST_STAGE_NAME\]/g, form.artistStageName)
        .replace(/\[ARTIST_ADDRESS\]/g, form.artistAddress)
        .replace(/\[ARTIST_COUNTRY\]/g, form.artistCountry);

      const doc = new jsPDF();
      const splitText = doc.splitTextToSize(filledTemplate, 180);
      doc.setFontSize(11);
      doc.text(splitText, 10, 10);
      doc.save(`${form.beatTitle || "Digital_Agreement"}.pdf`);
      toast.success("PDF Created Successfully");
    } catch (error) {
      toast.error("Failed to generate PDF");
    }

    setForm(defaultValues);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-michroma">
      <h1 className="text-xl font-bold mb-6">Exclusive Beat License Manager</h1>

      <div className="bg-slate-800 p-4 rounded-lg mb-6 space-y-6">
        <h2 className="text-lg font-semibold">Download PDF</h2>

        <div>
          <h3 className="font-semibold mb-2">License Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-2 rounded bg-slate-700"
            />
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700"
            >
              <option>US dollars</option>
              <option>Euro</option>
              <option>Pound Sterling</option>
            </select>
            <input
              type="text"
              name="licenseName"
              value={form.licenseName}
              onChange={handleChange}
              placeholder="License Name"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="deliverable"
              value={form.deliverable}
              onChange={handleChange}
              placeholder="Deliverable"
              className="p-2 rounded bg-slate-700"
            />
          </div>
          <label className="flex items-center mt-2 space-x-2">
            <input
              type="checkbox"
              name="noticeOfOutstandingClients"
              checked={form.noticeOfOutstandingClients}
              onChange={handleChange}
              className="accent-custom"
            />
            <span>Include a "Notice of outstanding clients"</span>
          </label>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Producer Royalties</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="writersShare"
              value={form.writersShare}
              onChange={handleChange}
              placeholder="Writer's Share (%)"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="publishersShare"
              value={form.publishersShare}
              onChange={handleChange}
              placeholder="Publisher's Share (%)"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="masterRoyalties"
              value={form.masterRoyalties}
              onChange={handleChange}
              placeholder="Master Royalties (%)"
              className="p-2 rounded bg-slate-700"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Beat Info</h3>
          <input
            type="text"
            name="beatTitle"
            value={form.beatTitle}
            onChange={handleChange}
            placeholder="Beat Title"
            className="p-2 rounded bg-slate-700 w-full"
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Producer Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="producerLegalName"
              value={form.producerLegalName}
              onChange={handleChange}
              placeholder="Legal Name"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="producerStageName"
              value={form.producerStageName}
              onChange={handleChange}
              placeholder="Stage Name"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="producerAddress"
              value={form.producerAddress}
              onChange={handleChange}
              placeholder="Address"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="producerCountry"
              value={form.producerCountry}
              onChange={handleChange}
              placeholder="Country"
              className="p-2 rounded bg-slate-700"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Artist Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="artistLegalName"
              value={form.artistLegalName}
              onChange={handleChange}
              placeholder="Legal Name"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="artistStageName"
              value={form.artistStageName}
              onChange={handleChange}
              placeholder="Stage Name"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="artistAddress"
              value={form.artistAddress}
              onChange={handleChange}
              placeholder="Address"
              className="p-2 rounded bg-slate-700"
            />
            <input
              type="text"
              name="artistCountry"
              value={form.artistCountry}
              onChange={handleChange}
              placeholder="Country"
              className="p-2 rounded bg-slate-700"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 bg-custom px-6 py-2 rounded hover:scale-105 transition-transform disabled:opacity-50"
        >
          {loading ? "Generating..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
}
