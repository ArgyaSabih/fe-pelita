"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalCreateFeedback({
  isOpen,
  onClose,
  onCreate
}) {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      type,
      content
    });

    // opsional: reset form setelah submit
    setType("");
    setContent("");
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
          Tambah Feedback Baru
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Type Select */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tipe Feedback
            </label>

            <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
            required
            >
              <option value="">Pilih Tipe</option>
              <option value="saran">Saran</option>
              <option value="keluhan">Keluhan</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Isi Feedback
            </label>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-28 rounded-md border p-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
                required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-[#7DD3FC] py-2 font-semibold text-white hover:bg-[#38BDF8] transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
