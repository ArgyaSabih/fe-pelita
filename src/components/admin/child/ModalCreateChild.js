"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalCreateChild({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    class: "",
    medicalRecord: "",
    notes: "",
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
      name: "",
      dateOfBirth: "",
      class: "",
      medicalRecord: "",
      notes: "",
    });
  };

  const handleClose = () => {
    setFormData({
      name: "",
      dateOfBirth: "",
      class: "",
      medicalRecord: "",
      notes: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="border-blue-primary-500 relative w-full max-w-md rounded-lg border-r-4 border-b-4 bg-white p-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <h2 className="mb-6 text-2xl font-semibold">Create New Entry</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Nama */}
            <div className="col-span-1">
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Nama anak"
              />
            </div>

            {/* Tanggal Lahir */}
            <div className="col-span-1">
              <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-medium text-gray-700">
                Tanggal Lahir
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Kelas */}
            <div className="col-span-1">
              <label htmlFor="class" className="mb-2 block text-sm font-medium text-gray-700">
                Kelas
              </label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Pilih Kelas</option>
                <option value="Kelas A">Kelas A</option>
                <option value="Kelas B">Kelas B</option>
              </select>
            </div>

            {/* Riwayat Kesehatan */}
            <div className="col-span-1">
              <label
                htmlFor="medicalRecord"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Riwayat Kesehatan
              </label>
              <input
                type="text"
                id="medicalRecord"
                name="medicalRecord"
                value={formData.medicalRecord}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Sehat"
              />
            </div>

            {/* Catatan Anak */}
            <div className="col-span-2">
              <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-700">
                Catatan Anak
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Catatan tambahan"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="mt-6 w-full cursor-pointer rounded-md bg-sky-400 py-3 font-medium text-white hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

