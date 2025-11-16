"use client";
import React from "react";
import { FiEdit, FiTrash2, FiMoreHorizontal } from "react-icons/fi";
import { BsChevronExpand } from "react-icons/bs";

export default function TableChildAdmin({
  items,
  page,
  sortBy,
  sortDir,
  toggleSort,
  onDetailClick,
  onEditClick,
  onDeleteClick,
}) {
  const renderField = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    return value;
  };

  const getParentName = (parents) => {
    if (!parents || parents.length === 0) return "-";
    if (Array.isArray(parents)) {
      return parents.map((p) => p.name || p.email).join(", ");
    }
    return parents.name || parents.email || "-";
  };

  return (
    <div className="rounded-md border bg-white p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-lg">
          <thead>
            <tr className="text-left text-lg text-gray-600">
              <th className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <span>ID</span>
                  <button
                    type="button"
                    onClick={() => toggleSort("id")}
                    className={`text-gray-600 hover:text-black ${sortBy === "id" ? "text-black" : ""}`}
                    aria-label="Sort by ID"
                  >
                    <BsChevronExpand />
                  </button>
                  {sortBy === "id" && (
                    <span className="ml-1 text-sm">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <span>Nama</span>
                  <button
                    type="button"
                    onClick={() => toggleSort("name")}
                    className={`text-gray-600 hover:text-black ${sortBy === "name" ? "text-black" : ""}`}
                    aria-label="Sort by name"
                  >
                    <BsChevronExpand />
                  </button>
                  {sortBy === "name" && (
                    <span className="ml-1 text-sm">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th className="px-3 py-2">Orang Tua</th>
              <th className="px-3 py-2">Invitation Code</th>
              <th className="px-3 py-2">Detail</th>
              <th className="px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-3 pt-8 pb-6 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg">Tidak ada data yang ditemukan</span>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((child, idx) => {
                const key = child._id ?? child.id ?? `row-${page}-${idx}`;
                const displayId = child._id
                  ? child._id.substring(child._id.length - 5)
                  : child.id
                    ? child.id.toString().padStart(1, "0")
                    : idx + 1;

                return (
                  <tr key={key} className="border-t odd:bg-sky-50">
                    <td className="px-3 py-3 font-semibold">{displayId}</td>
                    <td className="px-3 py-3">{renderField(child.name)}</td>
                    <td className="px-3 py-3">{getParentName(child.parents)}</td>
                    <td className="px-3 py-3 font-semibold">
                      {renderField(child.invitationCode)}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => onDetailClick(child)}
                        className="cursor-pointer text-gray-600 hover:text-black"
                        title="View Details"
                      >
                        <FiMoreHorizontal />
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditClick(child)}
                          className="cursor-pointer text-gray-600 hover:text-black"
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => onDeleteClick(child)}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          title="Delete"
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

