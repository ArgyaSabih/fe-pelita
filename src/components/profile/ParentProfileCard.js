// src/components/profile/ParentProfileCard.js
"use client";

import { useState, useEffect } from "react";
// Pastikan path ini benar (sesuai nama file helper Anda)
import { updateProfile } from "@/utils/helpers/authHelper";

export default function ParentProfileCard({ user, onProfileUpdate, onError }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phoneNumber: "", address: "" });
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
    });
    onError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    onError(null);
    try {
      const updatedUser = await updateProfile(formData);
      onProfileUpdate(updatedUser);
      setIsEditing(false);
    } catch (err) {
      onError(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-adlam-display-regular text-3xl font-bold text-gray-900">
            Profil Orang Tua
          </h1>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-pink-primary-200 hover:bg-pink-primary-300 rounded-lg px-5 py-2 font-semibold text-gray-800 transition"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg bg-gray-200 px-5 py-2 font-semibold text-gray-800 transition hover:bg-gray-300"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="rounded-lg bg-green-500 px-5 py-2 font-semibold text-white transition hover:bg-green-600 disabled:opacity-50"
              >
                {saveLoading ? "..." : "Simpan"}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Form fields (Nama, Email, No. HP, Alamat) */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
            {!isEditing ? (
              <p className="mt-1 text-lg text-gray-900">{user.name}</p>
            ) : (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="font-farro-medium mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1 text-lg text-gray-700">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">No. Handphone</label>
            {!isEditing ? (
              <p className="mt-1 text-lg text-gray-900">{user.phoneNumber}</p>
            ) : (
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="font-farro-medium mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Alamat Rumah</label>
            {!isEditing ? (
              <p className="mt-1 text-lg text-gray-900">{user.address}</p>
            ) : (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="font-farro-medium mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
