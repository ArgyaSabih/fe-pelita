"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalUpdatePermission({ isOpen, onClose, onUpdate, permissionData }) {
  const [studentName, setStudentName] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [supportingDocument, setSupportingDocument] = useState("");

  // Load existing data when modal opened
  useEffect(() => {
    if (permissionData) {
      setStudentName(permissionData.studentName || "");
      setReason(permissionData.reason || "");

      // Format dates for input (YYYY-MM-DD)
      if (permissionData.startDate) {
        const start = new Date(permissionData.startDate);
        setStartDate(start.toISOString().split("T")[0]);
      }
      if (permissionData.endDate) {
        const end = new Date(permissionData.endDate);
        setEndDate(end.toISOString().split("T")[0]);
      }

      setSupportingDocument(permissionData.supportingDocument || "");
    }
  }, [permissionData]);

  if (!isOpen || !permissionData) return null;

  // Only allow edit if status is pending
  const canEdit = permissionData.status?.toLowerCase() === "pending";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canEdit) {
      alert("Hanya surat izin dengan status pending yang dapat diubah");
      return;
    }

    const payload = {
      studentName,
      reason,
      startDate,
      endDate,
    };

    // Add supportingDocument only if provided
    if (supportingDocument.trim()) {
      payload.supportingDocument = supportingDocument.trim();
    }

    onUpdate(permissionData.id || permissionData._id, payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-yellow-300 bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Edit Surat Izin</h2>

        {!canEdit && (
          <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-sm text-yellow-800">
              Hanya surat izin dengan status pending yang dapat diubah
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap Siswa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="mt-1 w-full rounded-md border bg-white p-2 text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300"
              required
              disabled={!canEdit}
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alasan Izin <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 h-28 w-full rounded-md border bg-white p-2 text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300"
              required
              disabled={!canEdit}
            ></textarea>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Mulai <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-md border bg-white p-2 text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300"
              required
              disabled={!canEdit}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Selesai <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
              className="mt-1 w-full rounded-md border bg-white p-2 text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300"
              required
              disabled={!canEdit}
            />
          </div>

          {/* Supporting Document (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dokumen Pendukung (Opsional)
            </label>
            <input
              type="url"
              value={supportingDocument}
              onChange={(e) => setSupportingDocument(e.target.value)}
              className="mt-1 w-full rounded-md border bg-white p-2 text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300"
              disabled={!canEdit}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canEdit}
            className={`w-full cursor-pointer rounded-md py-2 font-semibold transition-colors ${
              canEdit
                ? "bg-yellow-300 text-black hover:bg-yellow-400"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
