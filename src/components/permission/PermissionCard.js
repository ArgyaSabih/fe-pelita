"use client";
import { FiEdit, FiTrash2, FiClock } from "react-icons/fi";
import { formatDate, getStatusColor, getStatusText } from "@/utils/permission/permissionHelper";

export default function PermissionCard({ permission, index, onEditClick, onDeleteClick }) {
  const statusColor = getStatusColor(permission.status);
  const statusText = getStatusText(permission.status);

  // Only show edit/delete if status is pending
  const canEdit = permission.status?.toLowerCase() === "pending";

  // Number the permission letters (Surat Izin 1, 2, 3...)
  const permissionNumber = index + 1;

  return (
    <div className="rounded-lg border border-gray-200 bg-[#ECF7FC] p-5 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Header with date */}
      <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
        <FiClock className="h-4 w-4" />
        <span>Diajukan pada {formatDate(permission.createdAt)}</span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-semibold text-gray-900">
        Surat Izin {permissionNumber}
      </h3>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Catatan:
        </label>
        <input
          type="text"
          value={permission.reason || "-"}
          readOnly
          className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-700 outline-none"
        />
      </div>

      {/* Action buttons and status */}
      <div className="flex items-center justify-between">
        {/* Edit and Delete buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEditClick(permission)}
            disabled={!canEdit}
            className={`cursor-pointer rounded-md p-2 text-white transition-colors ${
              canEdit
                ? "bg-[#E6B35B] hover:bg-[#D4A04A]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            aria-label="Edit surat izin"
          >
            <FiEdit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDeleteClick(permission)}
            className="cursor-pointer rounded-md bg-[#DC6442] p-2 text-white hover:bg-[#C85535] transition-colors"
            aria-label="Hapus surat izin"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Status badge */}
        <button
          className="rounded-md px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: statusColor }}
        >
          Status Pengajuan: {statusText}
        </button>
      </div>
    </div>
  );
}

