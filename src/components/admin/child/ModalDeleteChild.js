"use client";
import { IoClose } from "react-icons/io5";

export default function ModalDeleteChild({ isOpen, onClose, onDelete, childData }) {
  if (!isOpen || !childData) return null;

  const handleDelete = () => {
    onDelete(childData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="border-red-500 relative w-full max-w-md rounded-lg border-r-4 border-b-4 bg-white p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <h2 className="mb-4 text-2xl font-semibold">Confirm Deletion</h2>

        {/* Confirmation Message */}
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete <strong>{childData.name}</strong>? This action cannot be
          undone.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-md border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 cursor-pointer rounded-md bg-red-500 py-2 font-medium text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

