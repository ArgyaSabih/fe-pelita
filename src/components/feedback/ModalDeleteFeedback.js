"use client";
import { IoClose } from "react-icons/io5";

export default function ModalDeleteFeedback({
  isOpen,
  onClose,
  onDelete,
  feedbackData
}) {
  if (!isOpen || !feedbackData) return null;

  const handleDelete = () => {
    onDelete(feedbackData);
  };

  const idShort = String(feedbackData._id).slice(-4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-red-300 bg-white p-6 shadow-lg text-gray-900">

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
          Hapus Feedback
        </h2>

        {/* Message */}
        <p className="mb-6 text-gray-800">
          Apakah anda yakin ingin menghapus Feedback ini (ID {idShort}: {feedbackData.type})?
        </p>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-full rounded-md bg-red-500 py-3 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          Delete
        </button>

      </div>
    </div>
  );
}
