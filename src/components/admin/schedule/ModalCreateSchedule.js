"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalCreateSchedule({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    day: "",
    date: "",
    time: "",
    activity: "",
    teacher: "",
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
      day: "",
      date: "",
      time: "",
      activity: "",
      teacher: "",
    });
  };

  const handleClose = () => {
    setFormData({
      day: "",
      date: "",
      time: "",
      activity: "",
      teacher: "",
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
            {/* Hari */}
            <div className="col-span-1">
              <label htmlFor="day" className="mb-2 block text-sm font-medium text-gray-700">
                Hari
              </label>
              <input
                type="text"
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Senin"
              />
            </div>

            {/* Tanggal */}
            <div className="col-span-1">
              <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-700">
                Tanggal
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Jam */}
            <div className="col-span-1">
              <label htmlFor="time" className="mb-2 block text-sm font-medium text-gray-700">
                Jam
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Kegiatan */}
            <div className="col-span-1">
              <label htmlFor="activity" className="mb-2 block text-sm font-medium text-gray-700">
                Kegiatan
              </label>
              <input
                type="text"
                id="activity"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Senam Pagi"
              />
            </div>

            {/* Guru */}
            <div className="col-span-2">
              <label htmlFor="teacher" className="mb-2 block text-sm font-medium text-gray-700">
                Guru
              </label>
              <input
                type="text"
                id="teacher"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Budi Speed"
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
