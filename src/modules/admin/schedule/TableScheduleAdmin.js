"use client";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BsChevronExpand } from "react-icons/bs";
import { renderField } from "@/utils/admin/scheduleHelper";

export default function TableScheduleAdmin({
  items,
  page,
  sortBy,
  sortDir,
  toggleSort,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <div className="rounded-md border bg-white p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-lg">
          <thead>
            <tr className="text-left text-lg text-gray-600">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Hari</th>
              <th className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <span>Tanggal</span>
                  <button
                    type="button"
                    onClick={() => toggleSort("date")}
                    className={`text-gray-600 hover:text-black ${sortBy === "date" ? "text-black" : ""}`}
                    aria-label="Sort by tanggal"
                  >
                    <BsChevronExpand />
                  </button>
                  {sortBy === "date" && (
                    <span className="ml-1 text-sm">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <span>Jam</span>
                  <button
                    type="button"
                    onClick={() => toggleSort("time")}
                    className={`text-gray-600 hover:text-black ${sortBy === "time" ? "text-black" : ""}`}
                    aria-label="Sort by jam"
                  >
                    <BsChevronExpand />
                  </button>
                  {sortBy === "time" && (
                    <span className="ml-1 text-sm">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th className="px-3 py-2">Kegiatan</th>
              <th className="px-3 py-2">Guru</th>
              <th className="px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-3 pt-8 pb-6 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg">Tidak ada data yang ditemukan</span>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((r, idx) => {
                const key = r._id ?? r.id ?? `row-${page}-${idx}`;
                const activityObj = Array.isArray(r.activity) ? r.activity[0] : r.activity || {};
                return (
                  <tr key={key} className="border-t odd:bg-sky-50">
                    <td className="px-3 py-3 font-semibold">
                      {renderField(
                        r._id.substring(r._id.length - 5) ?? r.id.substring(r.id.length - 5),
                      )}
                    </td>
                    <td className="px-3 py-3">{renderField(r.day)}</td>
                    <td className="px-3 py-3">{renderField(r.date)}</td>
                    <td className="px-3 py-3">{renderField(activityObj.time)}</td>
                    <td className="px-3 py-3">
                      {renderField(
                        activityObj.subject ?? activityObj.activity ?? activityObj.title,
                      )}
                    </td>
                    <td className="px-3 py-3">{renderField(activityObj.teacher)}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditClick(r)}
                          className="cursor-pointer text-gray-600 hover:text-black"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => onDeleteClick(r)}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
