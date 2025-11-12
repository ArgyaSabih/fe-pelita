"use client";
import { IoClose } from "react-icons/io5";

export default function ModalDeleteSchedule({ isOpen, onClose, onDelete, scheduleData }) {
  if (!isOpen || !scheduleData) return null;

  const scheduleId = scheduleData._id || scheduleData.id || "";
  const shortId = scheduleId.substring(scheduleId.length - 5);

  const handleDelete = () => {
    onDelete(scheduleData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg border-r-4 border-b-4 border-red-500 bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <h2 className="mb-4 text-xl font-semibold">ID: {shortId}</h2>

        {/* Confirmation Message */}
        <p className="mb-6 text-center text-lg">Apakah anda yakin ingin menghapus baris ini?</p>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-full cursor-pointer rounded-md bg-red-500 py-3 font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
