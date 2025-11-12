"use client";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { formatDate, truncateText } from "@/utils/admin/announcementHelper";

export default function AnnouncementCard({ announcement, onEditClick, onDeleteClick }) {
  return (
    <div className="rounded-lg border bg-[#ECF7FC] p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Title and Actions */}
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-900 flex-1 pr-4">
          {announcement.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEditClick(announcement)}
            className="cursor-pointer rounded-md bg-orange-400 p-2 text-white hover:bg-orange-500 transition-colors"
            aria-label="Edit announcement"
          >
            <FiEdit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDeleteClick(announcement)}
            className="cursor-pointer rounded-md bg-red-500 p-2 text-white hover:bg-red-600 transition-colors"
            aria-label="Delete announcement"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Date */}
      <p className="mb-3 text-sm text-gray-600">
        {formatDate(announcement.dateSent)}
      </p>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed">
        {truncateText(announcement.content, 150)}
      </p>
    </div>
  );
}

