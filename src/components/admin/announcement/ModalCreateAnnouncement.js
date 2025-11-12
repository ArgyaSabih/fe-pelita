"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalCreateAnnouncement({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    // Reset form
    setFormData({
      title: "",
      content: "",
    });
  };

  const handleClose = () => {
    setFormData({
      title: "",
      content: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="border-blue-primary-500 relative w-full max-w-md rounded-lg border-r-4 border-b-4 bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <h2 className="mb-6 text-2xl font-semibold">Buat Pengumuman Baru</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Judul Pengumuman */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
              Judul Pengumuman
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Masukkan judul pengumuman"
            />
          </div>

          {/* Isi Pengumuman */}
          <div className="mb-6">
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
              Isi Pengumuman
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Masukkan isi pengumuman"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-sky-400 py-3 font-medium text-white hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

