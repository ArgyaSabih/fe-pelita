"use client";
import { useState, useMemo } from "react";
import { FiEdit, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
import PaginationAdmin from "@/components/admin/PaginationAdmin";
import HeaderAdmin from "./HeaderAdmin";

const sample = Array.from({ length: 70 }).map((_, i) => ({
  id: i + 1,
  day: i % 2 === 0 ? "Senin" : "Selasa",
  date: i % 2 === 0 ? "3 November 2025" : "4 November 2025",
  time: "08:00",
  activity: "Senam Pagi",
  teacher: "Budi Speed",
}));

export default function ScheduleAdmin() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    if (!query) return sample;
    const q = query.toLowerCase();
    return sample.filter((r) => {
      return (
        r.id.toString().includes(q) ||
        r.day.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q) ||
        r.time.toLowerCase().includes(q) ||
        r.activity.toLowerCase().includes(q) ||
        r.teacher.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  if (page > totalPages) setPage(1);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  function goTo(p) {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
  }

  return (
    <div className="font-adlam-display-regular pb-6">
      <HeaderAdmin username="Budi Speed" email="budispeed@gmail.com" />
      <div className="px-8">
        <div className="mb-5 flex w-full">
          <div className="flex w-full items-center justify-between">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-[17rem] rounded-md border px-3 py-2 pr-8 text-lg"
              />
              <FiSearch className="absolute top-0 right-3 h-full w-[1.25rem] justify-center text-gray-400" />
            </div>
            <button
              onClick={() => alert("Create clicked")}
              className="bg-dark-500 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-white"
            >
              <FiPlus /> <span className="text-lg">Create</span>
            </button>
          </div>
        </div>

        <div className="rounded-md border bg-white p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-lg">
              <thead>
                <tr className="text-left text-lg text-gray-600">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Hari</th>
                  <th className="px-3 py-2">Tanggal</th>
                  <th className="px-3 py-2">Jam</th>
                  <th className="px-3 py-2">Kegiatan</th>
                  <th className="px-3 py-2">Guru</th>
                  <th className="px-3 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-3 pt-8 pb-6 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-lg">Tidak ada data yang ditemukan</span>
                        {query && (
                          <span className="text-sm">
                            Coba kata kunci lain atau hapus filter pencarian
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((r) => (
                    <tr key={r.id} className="border-t odd:bg-sky-50">
                      <td className="px-3 py-3 font-semibold">{r.id}</td>
                      <td className="px-3 py-3">{r.day}</td>
                      <td className="px-3 py-3">{r.date}</td>
                      <td className="px-3 py-3">{r.time}</td>
                      <td className="px-3 py-3">{r.activity}</td>
                      <td className="px-3 py-3">{r.teacher}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <button className="cursor-pointer text-gray-600 hover:text-black">
                            <FiEdit />
                          </button>
                          <button className="cursor-pointer text-red-500 hover:text-red-700">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <PaginationAdmin page={page} totalPages={totalPages} onPageChange={goTo} />
          </div>
        </div>
      </div>
    </div>
  );
}
