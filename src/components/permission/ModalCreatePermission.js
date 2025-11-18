"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalCreatePermission({
  isOpen,
  onClose,
  onCreate
}) {
  const [studentName, setStudentName] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [supportingDocument, setSupportingDocument] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

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

    onCreate(payload);

    // Reset form
    setStudentName("");
    setReason("");
    setStartDate("");
    setEndDate("");
    setSupportingDocument("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-[#A9DCF1] bg-white p-6 shadow-lg">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Tambah Surat Izin Baru
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Student Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Nama Lengkap Siswa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
              required
              placeholder="Masukkan nama lengkap siswa"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Alasan Izin <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-28 rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
              required
              placeholder="Masukkan alasan izin"
            ></textarea>
          </div>

          {/* Start Date */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tanggal Mulai <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tanggal Selesai <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
              className="w-full rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Supporting Document (Optional) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Dokumen Pendukung (Opsional)
            </label>
            <input
              type="url"
              value={supportingDocument}
              onChange={(e) => setSupportingDocument(e.target.value)}
              className="w-full rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="https://example.com/dokumen.pdf"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-[#7DD3FC] py-2 font-semibold text-white hover:bg-[#38BDF8] transition-colors"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

