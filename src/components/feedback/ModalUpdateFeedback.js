"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalEditFeedback({
  isOpen,
  onClose,
  onUpdate,
  feedbackData
}) {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  // Load existing data when modal opened
  useEffect(() => {
    if (feedbackData) {
      setType(feedbackData.type || "");
      setContent(feedbackData.content || "");
    }
  }, [feedbackData]);

  if (!isOpen || !feedbackData) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      id: feedbackData._id,
      type,
      content
    });
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
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Edit Feedback Baru
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipe Feedback
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300"
              required
            >
              <option value="saran">Saran</option>
              <option value="keluhan">Keluhan</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Isi Feedback
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full h-28 rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-yellow-300 py-2 font-semibold text-black hover:bg-yellow-400 transition-colors"
          >
            Edit
          </button>

        </form>
      </div>
    </div>
  );
}
