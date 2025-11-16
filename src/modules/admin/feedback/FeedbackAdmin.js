"use client";
import { FiSearch } from "react-icons/fi";

import HeaderAdmin from "./HeaderAdmin";
import FeedbackCard from "@/components/admin/feedback/FeedbackCard";
import PaginationAdmin from "@/components/admin/PaginationAdmin";

import { useFeedbackManagement } from "@/utils/hooks/useFeedbackManagement";

export default function FeedbackAdmin() {
  const {
    query,
    setQuery,
    page,
    totalPages,
    items,
    user,
    loading,
    error,
    goTo,
  } = useFeedbackManagement({
    pageSize: 10,
    mode: "admin"
  });

  return (
    <div className="font-adlam-display-regular min-h-screen bg-gray-50 pb-6">

      {/* HEADER */}
      <HeaderAdmin
        username={user?.name ?? ""}
        email={user?.email ?? ""}
        title="Feedback"
        icon="feedback"
      />

      <div className="px-8">

        {/* SEARCH */}
        <div className="mb-5 flex w-full items-center justify-between">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari feedback..."
              className="w-72 rounded-md border px-3 py-2 pr-8 text-lg 
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <FiSearch className="absolute top-0 right-3 h-full w-5 text-gray-400" />
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-16 text-center text-gray-500">
            Memuat feedback...
          </div>
        )}

        {/* FEEDBACK LIST */}
          {!loading && (
          <div className="space-y-4">

            {/* CASE: ERROR */}
            {error && (
              <div className="flex flex-col items-center justify-center rounded-lg border bg-red-50 py-14 px-4">
                <p className="text-lg font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* CASE: NO DATA */}
            {!error && items.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-16">
                <p className="text-lg text-gray-500">
                  Tidak ada feedback yang ditemukan
                </p>
              </div>
            )}

            {/* CASE: SHOW ITEMS */}
            {!error &&
              items.length > 0 &&
              items.map((fb) => (
                <FeedbackCard
                  key={fb._id}
                  feedback={fb}
                  isAdmin={true}
                />
              ))}
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex items-center justify-center">
        <PaginationAdmin
          page={page}
          totalPages={totalPages}
          onPageChange={goTo}
        />
      </div>

    </div>
  );
}
