"use client";
import { FiX } from "react-icons/fi";
import { useState } from "react";

export default function ModalRejectPermission({ isOpen, onClose, onReject, permissionData }) {
  const [adminNotes, setAdminNotes] = useState("");

  if (!isOpen) return null;

  const handleReject = () => {
    if (permissionData) {
      onReject(permissionData, adminNotes);
      setAdminNotes(""); // Reset notes after reject
    }
  };

  const handleClose = () => {
    setAdminNotes(""); // Reset notes when closing
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Modal Header */}
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Reject Surat Izin</h2>

        {/* Modal Body */}
        <div className="mb-6">
          <p className="mb-4 text-gray-700">Apakah Anda yakin ingin menolak surat izin ini?</p>

          {permissionData && (
            <div className="mb-4 space-y-2 rounded-md bg-gray-50 p-4">
              {permissionData.studentName && (
                <p className="text-sm">
                  <span className="font-medium">Nama Siswa:</span> {permissionData.studentName}
                </p>
              )}
              {permissionData.parent?.name && (
                <p className="text-sm">
                  <span className="font-medium">Orang Tua:</span> {permissionData.parent.name}
                </p>
              )}
              {permissionData.reason && (
                <p className="text-sm">
                  <span className="font-medium">Alasan:</span> {permissionData.reason}
                </p>
              )}
            </div>
          )}

          {/* Admin Notes Input */}
          <div>
            <label
              htmlFor="adminNotesReject"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Alasan Penolakan (Opsional):
            </label>
            <textarea
              id="adminNotesReject"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Berikan alasan penolakan jika diperlukan..."
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleReject}
            className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
