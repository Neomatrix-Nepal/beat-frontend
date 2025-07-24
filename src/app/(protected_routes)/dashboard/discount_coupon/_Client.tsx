"use client";
import { Coupon } from "@/src/types";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  deleteDiscountCoupon,
  updateDiscountCoupon,
  uploadDiscountCoupon,
} from "./action";
import { formatDateTime, toDateInputValue } from "@/src/lib/utils";

const defaultForm: Coupon = {
  code: "",
  description: "",
  discountPercentage: 1,
  validFrom: "",
  validUntil: "",
};

export default function _Client({
  coupons: initialCoupons,
}: {
  coupons: Coupon[];
}) {
  const [form, setForm] = useState(defaultForm);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons || []);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (
      !form.code ||
      !form.discountPercentage ||
      !form.validFrom ||
      !form.validUntil
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    const newCoupon: Coupon = {
      ...form,
      discountPercentage: Number(form.discountPercentage),
    };

    if (editing) {
      console.log(newCoupon, form);
      const { id } = await updateDiscountCoupon(
        form.id!.toString(),
        {
          code: newCoupon.code,
          description: newCoupon.description,
          discountPercentage: newCoupon.discountPercentage,
          validFrom: newCoupon.validFrom,
          validUntil: newCoupon.validUntil,
        },
        session?.user?.tokens.accessToken!
      );
      if (!id) {
        alert("Failed to update coupon.");
        return;
      }
      setCoupons((prev) =>
        prev.map((c) => (c.id === newCoupon.id ? newCoupon : c))
      );
      alert("Coupon updated.");
    } else {
      const { id } = await uploadDiscountCoupon(
        newCoupon,
        session?.user?.tokens.accessToken!
      );
      if (!id) {
        alert("Failed to add coupon.");
        return;
      }
      newCoupon.id = id;
      setCoupons((prev) => [newCoupon, ...prev]);
      alert("Coupon added.");
    }

    setForm(defaultForm);
    setEditing(false);
    setLoading(false);
  };

  const handleEdit = (coupon: Coupon) => {
    setForm(coupon);
    setEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      const { message } = await deleteDiscountCoupon(
        id.toString(),
        session?.user?.tokens.accessToken!
      );
      if (message) return alert("Failed to delete coupon." + message);
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      alert("Coupon deleted.");
      setForm(defaultForm);
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-michroma">
      <h1 className="text-xl font-bold mb-6">Coupon Manager</h1>

      {/* Form */}
      <div className="bg-slate-800 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editing ? "Edit Coupon" : "Add New Coupon"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="code" className="mb-1">
              Coupon Code *
            </label>
            <input
              id="code"
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g., SAVE10"
              className="p-2 rounded bg-slate-700 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col sm:col-span-2 md:col-span-3">
            <label htmlFor="description" className="mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional description..."
              className="p-2 rounded bg-slate-700 placeholder:text-gray-400 resize-none"
              rows={2}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="discountPercentage" className="mb-1">
              Discount % *
            </label>
            <input
              id="discountPercentage"
              type="number"
              name="discountPercentage"
              value={form.discountPercentage}
              onChange={handleChange}
              placeholder="e.g., 15"
              className="p-2 rounded bg-slate-700 placeholder:text-gray-400"
              min={0}
              max={100}
              step="0.01"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="validFrom" className="mb-1">
              Valid From *
            </label>
            <input
              id="validFrom"
              type="date"
              name="validFrom"
              value={toDateInputValue(form.validFrom)}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="validUntil" className="mb-1">
              Valid Until *
            </label>
            <input
              id="validUntil"
              type="date"
              name="validUntil"
              value={toDateInputValue(form.validUntil)}
              onChange={handleChange}
              className="p-2 rounded bg-slate-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 bg-custom px-6 py-2 rounded hover:scale-105 transition-transform disabled:opacity-50"
        >
          {loading ? "Saving..." : editing ? "Update Coupon" : "Add Coupon"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">All Coupons</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Discount %</th>
                <th className="px-4 py-2">Valid From</th>
                <th className="px-4 py-2">Valid Until</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-400">
                    No coupons available.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className="border-t border-slate-600 hover:bg-slate-700"
                  >
                    <td className="px-4 py-2">{coupon.code}</td>
                    <td className="px-4 py-2">{coupon.description || "—"}</td>
                    <td className="px-4 py-2">{coupon.discountPercentage}%</td>
                    <td className="px-4 py-2">
                      {formatDateTime(coupon.validFrom)}
                    </td>
                    <td className="px-4 py-2">
                      {formatDateTime(coupon.validUntil)}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        className="text-yellow-400 underline text-sm"
                        onClick={() => handleEdit(coupon)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-400 underline text-sm"
                        onClick={() => handleDelete(coupon.id!)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
