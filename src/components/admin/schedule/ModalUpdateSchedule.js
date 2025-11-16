"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalUpdateSchedule({ isOpen, onClose, onUpdate, scheduleData }) {
  const [formData, setFormData] = useState({
    id: "",
    day: "",
    date: "",
    time: "",
    activity: "",
    teacher: "",
  });

  useEffect(() => {
    if (scheduleData) {
      const parseDateToInput = (dateStr) => {
        if (!dateStr) return "";

        const months = {
          Januari: "01",
          Februari: "02",
          Maret: "03",
          April: "04",
          Mei: "05",
          Juni: "06",
          Juli: "07",
          Agustus: "08",
          September: "09",
          Oktober: "10",
          November: "11",
          Desember: "12",
        };

        const parts = dateStr.split(" ");
        if (parts.length === 3) {
          const day = parts[0].padStart(2, "0");
          const month = months[parts[1]];
          const year = parts[2];
          return `${year}-${month}-${day}`;
        }
        return "";
      };

      let activityText = "";
      let teacherText = "";
      let timeText = "";

      if (Array.isArray(scheduleData.activity) && scheduleData.activity.length > 0) {
        activityText = scheduleData.activity[0].subject || scheduleData.activity[0].activity || "";
        teacherText = scheduleData.activity[0].teacher || "";
        timeText = scheduleData.activity[0].time || scheduleData.time || "";
      } else if (scheduleData.activity && typeof scheduleData.activity === "object") {
        activityText = scheduleData.activity.subject || scheduleData.activity.activity || "";
        teacherText = scheduleData.activity.teacher || scheduleData.teacher || "";
        timeText = scheduleData.activity.time || scheduleData.time || "";
      } else {
        activityText = scheduleData.activity || "";
        teacherText = scheduleData.teacher || "";
        timeText = scheduleData.time || "";
      }

      setFormData({
        id: scheduleData._id || scheduleData.id || "",
        day: scheduleData.day || "",
        date: parseDateToInput(scheduleData.date),
        time: timeText,
        activity: activityText,
        teacher: teacherText,
      });
    }
  }, [scheduleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleClose = () => {
    setFormData({
      id: "",
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
      <div className="relative w-full max-w-md rounded-lg border-r-4 border-b-4 border-yellow-400 bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <h2 className="mb-6 text-2xl font-semibold">
          ID: {formData.id.substring(formData.id.length - 5)}
        </h2>

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

          {/* Update Button */}
          <button
            type="submit"
            className="mt-6 w-full cursor-pointer rounded-md bg-yellow-400 py-3 font-medium text-white hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
