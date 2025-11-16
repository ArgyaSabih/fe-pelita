"use client";
import { useState, useEffect } from "react";
import { fetchSchedules } from "@/utils/admin/scheduleHelper";
import Image from "next/image";
// Swiper for mobile day tabs
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Senin");
  const [currentDate, setCurrentDate] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { items } = await fetchSchedules({ page: 1, pageSize: 100 });
        setSchedules(items);

        if (items.length > 0) {
          setCurrentDate(items[0].date);
        }
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // responsive itemsPerPage: 5 for small screens (<md), otherwise 8
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window === "undefined") return;
      setItemsPerPage(window.innerWidth < 768 ? 5 : 8);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredSchedules = schedules.filter((schedule) => schedule.day === activeTab);

  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedSchedules = filteredSchedules.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleTabChange = (day) => {
    setActiveTab(day);
    setPage(1);
  };

  return (
    <div className="font-adlam-display-regular relative min-h-screen overflow-y-hidden bg-white pt-28 pb-12">
      <div className="pointer-events-none absolute bottom-[-5.5rem] left-[-2.5rem] h-[18rem] w-[18rem] md:h-[20rem] md:w-[20rem]">
        <Image
          src="/assets/schedule/dino-lucu.webp"
          fill
          alt="dino aset"
          className="object-contain"
        />
      </div>
      {/* Header */}
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <Image
              src="/assets/schedule/schedule-icon.svg"
              fill
              alt="schedule icon"
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Pantau jadwal anak anda disini!
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8">
        {/* Day Tabs - Desktop */}
        <div className="mb-2 hidden md:block">
          <div className="flex gap-2 border-b-2 border-gray-200">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleTabChange(day)}
                className={`cursor-pointer px-6 py-3 text-lg font-semibold transition-colors ${
                  activeTab === day
                    ? "border-yellow-primary-300 border-b-4 text-gray-800"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Day Tabs - Mobile */}
        <div className="mb-6 md:hidden">
          <Swiper spaceBetween={8} slidesPerView={"auto"} className="pb-2">
            {days.map((day) => (
              <SwiperSlide key={day} style={{ width: "auto" }}>
                <button
                  onClick={() => handleTabChange(day)}
                  className={`flex-shrink-0 cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === day
                      ? "bg-yellow-primary-300 text-gray-800"
                      : "hover:bg-yellow-primary-200 bg-gray-100 text-gray-700"
                  }`}
                >
                  {day}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Schedule Table - Desktop */}
        <div className="mb-8 hidden overflow-hidden rounded-lg bg-white shadow-md md:block">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Kegiatan</th>
                <th className="px-6 py-4">Jam</th>
                <th className="px-6 py-4">Guru</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : paginatedSchedules.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    Tidak ada jadwal untuk hari ini
                  </td>
                </tr>
              ) : (
                paginatedSchedules.map((schedule, index) => {
                  const activity = Array.isArray(schedule.activity)
                    ? schedule.activity[0]
                    : schedule.activity;
                  return (
                    <tr
                      key={schedule._id || index}
                      className={`border-t ${index % 2 === 0 ? "bg-yellow-primary-200" : "bg-white"} `}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{schedule.date}</td>
                      <td className="px-6 py-4 text-gray-900">
                        {activity?.subject || activity?.activity || "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-900">{activity?.time || "-"}</td>
                      <td className="px-6 py-4 text-gray-900">{activity?.teacher || "-"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Schedule Cards - Mobile */}
        <div className="mb-8 space-y-3 md:hidden">
          {loading ? (
            <div className="rounded-lg bg-white p-6 text-center text-gray-500 shadow-md">
              Loading...
            </div>
          ) : paginatedSchedules.length === 0 ? (
            <div className="rounded-lg bg-white p-6 text-center text-gray-500 shadow-md">
              Tidak ada jadwal untuk hari ini
            </div>
          ) : (
            paginatedSchedules.map((schedule, index) => {
              const activity = Array.isArray(schedule.activity)
                ? schedule.activity[0]
                : schedule.activity;
              return (
                <div key={schedule._id || index} className={"rounded-lg bg-white p-4 shadow-md"}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">{schedule.date}</span>
                    <span className="rounded-lg bg-sky-100 px-3 py-1 text-sm font-medium text-gray-900">
                      {activity?.time || "-"}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-gray-900">
                    {activity?.subject || activity?.activity || "-"}
                  </h3>
                  <p className="text-sm text-gray-800">{activity?.teacher || "-"}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`h-10 w-10 cursor-pointer rounded-lg font-semibold transition-colors ${
                  page === pageNumber
                    ? "bg-yellow-primary-300 text-gray-900"
                    : "hover:bg-yellow-primary-200 bg-gray-200 text-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
