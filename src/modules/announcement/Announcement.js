"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AnnouncementCard from "@/components/announcement/AnnouncementCard";
import { fetchAnnouncements } from "@/utils/admin/announcementHelper";

export default function Announcement() {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const loadAnnouncements = async () => {
      setLoading(true);
      setError(null);

      try {
        const { items } = await fetchAnnouncements({
          page: 1,
          pageSize: 1000, // Fetch all data
        });
        setAllAnnouncements(items);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        setError(err.message || "Gagal memuat pengumuman");
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  const totalPages = Math.ceil(allAnnouncements.length / itemsPerPage);

  // Slice data untuk halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const announcements = allAnnouncements.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="font-adlam-display-regular relative h-full w-full overflow-y-hidden bg-white pt-32 pb-20">
      {/* Dino Image */}
      <div className="absolute bottom-[-5.5rem] left-[-2.5rem] h-[18rem] w-[18rem] md:h-[20rem] md:w-[20rem]">
        <Image
          src="/assets/schedule/dino-lucu.webp"
          fill
          alt="dino aset"
          className="object-contain"
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-4xl">Pengumuman</h1>
          <p className="text-lg text-gray-700">Lihat pengumuman baru dari sekolah</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
            <p className="text-lg text-red-700">{error}</p>
          </div>
        )}

        {/* Announcements List */}
        {!loading && !error && (
          <div className="space-y-6">
            {announcements.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
                <p className="text-xl text-gray-500">Belum ada pengumuman</p>
              </div>
            ) : (
              announcements.map((announcement, index) => (
                <AnnouncementCard
                  key={announcement._id || announcement.id || index}
                  announcement={announcement}
                  index={index}
                />
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="relative z-20 mt-8 flex items-center justify-end gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors ${
                  currentPage === page
                    ? "bg-yellow-primary-300 text-gray-900"
                    : "hover:bg-yellow-primary-200 bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
