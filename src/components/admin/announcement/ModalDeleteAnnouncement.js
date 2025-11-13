"use client";
import { IoClose } from "react-icons/io5";
import { formatDate } from "@/utils/admin/announcementHelper";

export default function ModalDeleteAnnouncement({ isOpen, onClose, onDelete, announcementData }) {
  if (!isOpen || !announcementData) return null;

  const handleDelete = () => {
    onDelete(announcementData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="border-blue-primary-500 relative w-full max-w-md rounded-lg border-r-4 border-b-4 bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <h2 className="mb-4 text-2xl font-semibold text-red-600">Hapus Pengumuman</h2>

        {/* Warning Message */}
        <p className="mb-4 text-gray-700">
          Apakah Anda yakin ingin menghapus pengumuman ini? Tindakan ini tidak dapat dibatalkan.
        </p>

        {/* Announcement Details */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <p className="mb-2 text-sm font-semibold text-gray-700">Judul:</p>
          <p className="mb-3 text-gray-900">{announcementData.title}</p>
          
          <p className="mb-2 text-sm font-semibold text-gray-700">Tanggal:</p>
          <p className="text-gray-900">{formatDate(announcementData.dateSent)}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-md border border-gray-300 bg-white py-3 font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 cursor-pointer rounded-md bg-red-500 py-3 font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

