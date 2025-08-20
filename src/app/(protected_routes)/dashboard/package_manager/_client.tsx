"use client";
import React, { useState } from "react";
import { Package } from "@/src/types";
import { updatePackage, uploadPackage } from "./action";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { IoMdEye } from "react-icons/io";
import { Edit, Trash } from "lucide-react";
import ConfirmPopUp from "@/src/components/ui/confirmPopUp";

const defaultFormData = {
  id: 0,
  name: "",
  description: "",
  price: "",
  purpose: "product",
  features: [""],
};

export default function _client({
  packages: packagesData,
}: {
  packages: Package[];
}) {
  const { data: session } = useSession();
  const [packages, setPackages] = useState<Package[]>(packagesData);
  const [form, setForm] = useState(defaultFormData);
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [selectedId, setSelectedId] =  useState<number|null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [viewPackage, setViewPackage] = useState<Package | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeatureField = () => {
    setForm({ ...form, features: [...form.features, ""] });
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: newFeatures });
  };

  const handleAddUpdate = async () => {
    if (!form.name || !form.price)
      return toast.error("Name and Price are required");
    setLoading(true);

    const pkgData: Package = {
      id: editing ? form.id : Date.now(),
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      purpose: form.purpose as Package["purpose"],
      features:
        form.purpose === "product"
          ? form.features.filter((f) => f.trim() !== "")
          : undefined,
    };

    if (editing) {
      const { id, ...rest } = pkgData;
      const response = await updatePackage(
        rest as Package,
        form.id.toString(),
        session?.user.tokens.accessToken as string
      );
      if (response.id) {
        setPackages((prev) =>
          prev.map((p) => (p.id === form.id ? pkgData : p))
        );
        toast.success("Package updated successfully!");
      } else {
        toast.error("Failed to update package. Please try again.");
        console.error("Upload failed:", response.error);
      }
    } else {
      const { id, ...rest } = pkgData;
      const response = await uploadPackage(
        rest as Package,
        session?.user.tokens.accessToken as string
      );

      if (response.id) {
        setPackages((prev) => [pkgData, ...prev]);
        toast.success("Package added successfully!");
      } else {
        toast.error("Failed to add package. Please try again.");
        console.error("Upload failed:", response.error);
      }
    }

    setForm(defaultFormData);
    setEditing(false);
    setLoading(false);
  };

  const handleEdit = (pkg: Package) => {
    setForm({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description || "",
      price: pkg.price.toString(),
      purpose: pkg.purpose,
      features: pkg.features || [""],
    });
    setEditing(true);
  };

  const handleDelete = (id: number) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    setSelectedId(null);
  };

  const exitEditMode = () => {
    setForm(defaultFormData);
    setEditing(false);
  };

  const filteredPackages =
    filter === "all" ? packages : packages.filter((p) => p.purpose === filter);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-michroma">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold ">Package Manager</h1>
      </div>

      {/* Form */}
      <div className="bg-slate-800 p-4 rounded-lg mb-6">
        <div className="flex justify-between w-full mb-2">
          <h2 className="text-lg font-semibold mb-3 ">
            {editing ? "Edit Package" : "Add New Package"}
          </h2>
          {editing && (
            <button
              onClick={exitEditMode}
              className="px-4 py-2 text-white bg-custom cursor-pointer rounded-md"
            >
              Exit Edit Mode
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Package Name"
            className="p-2 rounded bg-slate-700 placeholder:text-gray-400"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 rounded bg-slate-700 placeholder:text-gray-400"
          />
          <select
            name="purpose"
            value={form.purpose}
            disabled={editing}
            onChange={handleChange}
            className={`p-2 rounded bg-slate-700 ${
              editing && "cursor-not-allowed"
            }`}
          >
            <option value="product">Product</option>
            <option value="mixing_order">Mixing Order</option>
            <option value="custom_beats">Custom Beats</option>
          </select>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="col-span-1 md:col-span-3 p-2 rounded bg-slate-700 placeholder:text-gray-400"
          />
        </div>

        {form.purpose === "product" && (
          <div className="mt-4">
            <label className="block mb-2 ">Features</label>
            <div className="space-y-2">
              {form.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 p-2 rounded bg-slate-700 placeholder:text-gray-400 max-w-full"
                  />
                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="cursor-pointer text-red-500 text-lg font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeatureField}
                className="cursor-pointer text-blue-400 text-sm mt-1"
              >
                + Add Feature
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleAddUpdate}
          disabled={loading}
          className="mt-6 bg-custom px-6 py-2 rounded hover:scale-105 transition-transform  disabled:opacity-50"
        >
          {loading ? "Saving..." : editing ? "Update Package" : "Add Package"}
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2 ">Filter by Purpose:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-700 text-white p-2 rounded"
        >
          <option value="all">All</option>
          <option value="product">Product</option>
          <option value="mixing_order">Mixing Order</option>
          <option value="custom_beats">Custom Beats</option>
        </select>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 ">All Packages</h2>
        <div className="overflow-x-auto">
          {packages.length > 0 && (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-700 text-white ">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Purpose</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">
                      No packages found.
                    </td>
                  </tr>
                ) : (
                  filteredPackages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="border-t border-slate-600 hover:bg-slate-700"
                    >
                      <td className="px-4 py-2">{pkg.name}</td>
                      <td className="px-4 py-2 capitalize">{pkg.purpose}</td>
                      <td className="px-4 py-2">${pkg?.price}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center h-full w-full gap-2">
                          <button
                            className="cursor-pointer bg-blue-500 p-2 rounded-lg text-white hover:bg-slate-600/30 transition-colors"
                            onClick={() => setViewPackage(pkg)}
                          >
                            <IoMdEye size={16} />
                          </button>
                          <button
                            className="bg-yellow-400 text-black cursor-pointer p-2 rounded-lg hover:bg-slate-600/30 transition-colors"
                            onClick={() => {
                              handleEdit(pkg);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="cursor-pointer bg-black p-2 rounded-lg text-white hover:bg-slate-600/30 transition-colors"
                            onClick={() => {setSelectedId(pkg.id); setDeletePopUp(true);}}
                          >
                            <Trash size={18} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* View Modal */}
      {viewPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 text-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setViewPackage(null)}
              className="absolute top-2 right-3 text-xl text-white"
            >
              ×
            </button>
            <h2 className="text-lg font-bold  mb-3">{viewPackage.name}</h2>
            <p>
              <strong>Purpose:</strong> {viewPackage.purpose}
            </p>
            <p>
              <strong>Price:</strong> ${viewPackage.price}
            </p>
            {viewPackage.description && (
              <p>
                <strong>Description:</strong> {viewPackage.description}
              </p>
            )}
            {viewPackage.features && (
              <p>
                <strong>Features:</strong> {viewPackage.features.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {
        deletePopUp && 
        <ConfirmPopUp
          title={"Delete package?"}
          message={"Are you sure you want to delete this package?"}
          onCancel={() => setDeletePopUp(false)}
          onConfirm={() => {
            setDeletePopUp(false);
            handleDelete(selectedId!)
          }}
        />
      }
    </div>
  );
}
