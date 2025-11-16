"use client";

import { useState, useEffect } from "react";
import { updateChild } from "@/utils/helpers/authHelper";
import { FiPlus, FiTrash2 } from "react-icons/fi";

// Komponen format tanggal
function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ChildProfileCard({ child, onChildUpdate, onError }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ medicalRecord: [], notes: "" });
  const [saveLoading, setSaveLoading] = useState(false);

  const originalChildData = child || {};

  useEffect(() => {
    if (child) {
      setFormData({
        medicalRecord: child.medicalRecord || [],
        notes: child.notes || "",
      });
    }
  }, [child]);

  const handleMedicalRecordChange = (index, value) => {
    const updatedRecords = [...formData.medicalRecord];
    updatedRecords[index] = value;
    setFormData((prev) => ({ ...prev, medicalRecord: updatedRecords }));
  };

  const handleAddMedicalRecordItem = () => {
    setFormData((prev) => ({
      ...prev,
      medicalRecord: [...prev.medicalRecord, ""],
    }));
  };

  const handleRemoveMedicalRecordItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      medicalRecord: formData.medicalRecord.filter((_, i) => i !== index),
    }));
  };

  const handleNotesChange = (e) => {
    setFormData((prev) => ({ ...prev, notes: e.target.value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      medicalRecord: originalChildData.medicalRecord || [],
      notes: originalChildData.notes || "",
    });
    onError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    onError(null);
    try {
      const payload = {
        notes: formData.notes,
        medicalRecord: formData.medicalRecord.filter(Boolean), // Hapus string kosong
      };

      const updatedChild = await updateChild(originalChildData._id, payload);
      onChildUpdate(updatedChild);
      setIsEditing(false);
    } catch (err) {
      onError(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  if (!child) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="font-adlam-display-regular mb-4 text-3xl font-bold text-gray-900">
          Profil Anak
        </h1>
        <p>Belum ada anak yang terhubung.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-adlam-display-regular text-3xl font-bold text-gray-900">
            Profil Anak
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
          {/* Read-only fields */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
            <p className="mt-1 text-lg text-gray-900">{originalChildData.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Kelas</label>
            <p className="mt-1 text-lg text-gray-900">{originalChildData.class}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Tanggal Lahir</label>
            <p className="mt-1 text-lg text-gray-900">
              {formatDate(originalChildData.dateOfBirth)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Rekam Medis</label>
            {!isEditing ? (
              originalChildData.medicalRecord && originalChildData.medicalRecord.length > 0 ? (
                <ul className="mt-1 list-inside list-disc text-lg text-gray-900">
                  {originalChildData.medicalRecord.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-lg text-gray-900">-</p>
              )
            ) : (
              <div className="mt-1 w-full space-y-2">
                {formData.medicalRecord.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleMedicalRecordChange(index, e.target.value)}
                      className="font-farro-medium flex-grow rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicalRecordItem(index)}
                      className="rounded-md p-2 text-red-500 hover:bg-red-100"
                      aria-label="Hapus item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddMedicalRecordItem}
                  className="mt-2 flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
                >
                  <FiPlus /> Tambah Item
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Catatan</label>
            {!isEditing ? (
              <p className="mt-1 text-lg whitespace-pre-wrap text-gray-900">
                {formData.notes || "-"}
              </p>
            ) : (
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleNotesChange}
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
