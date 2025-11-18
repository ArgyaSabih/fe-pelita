"use client";
import { FiCheck, FiX, FiClock, FiUser, FiPaperclip, FiCalendar, FiMail } from "react-icons/fi";
import { formatDate, getStatusColor, getStatusText } from "@/utils/admin/permissionHelper";

export default function PermissionCardAdmin({ permission, index, onApproveClick, onRejectClick }) {
  const statusColor = getStatusColor(permission.status);
  const statusText = getStatusText(permission.status);

  // Only show approve/reject if status is pending
  const isPending = permission.status?.toLowerCase() === "pending";

  // Number the permission letters
  const permissionNumber = index + 1;

  return (
    <div className="rounded-lg border-r-4 border-b-4 border-[#A9DCF1] bg-[#ECF7FC] p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header with Title and Actions */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">Surat Izin {permissionNumber}</h3>

          {/* Date and Parent Info */}
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FiClock className="h-4 w-4" />
              <span>{formatDate(permission.createdAt)}</span>
            </div>
            {permission.parent?.name && (
              <div className="flex items-center gap-1">
                <FiUser className="h-4 w-4" />
                <span>Orang Tua: {permission.parent.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isPending && (
          <div className="flex gap-2">
            <button
              onClick={() => onApproveClick(permission)}
              className="cursor-pointer rounded-md bg-green-500 p-2 text-white transition-colors hover:bg-green-600"
              aria-label="Approve permission"
            >
              <FiCheck className="h-5 w-5" />
            </button>
            <button
              onClick={() => onRejectClick(permission)}
              className="cursor-pointer rounded-md bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
              aria-label="Reject permission"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Parent Email */}
      {permission.parent?.email && (
        <div className="mb-3 flex items-center gap-2">
          <FiMail className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Email Orang Tua: </span>
          <span className="text-sm text-gray-900">{permission.parent.email}</span>
        </div>
      )}

      {/* Student Name */}
      {permission.studentName && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Nama Siswa: </span>
          <span className="text-gray-900">{permission.studentName}</span>
        </div>
      )}

      {/* Date Range */}
      <div className="mb-3 flex items-start gap-4">
        <div className="flex items-center gap-2">
          <FiCalendar className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Tanggal Mulai: </span>
          <span className="text-sm text-gray-900">{formatDate(permission.startDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Tanggal Selesai: </span>
          <span className="text-sm text-gray-900">{formatDate(permission.endDate)}</span>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">Alasan:</label>
        <p className="leading-relaxed text-gray-700">{permission.reason}</p>
      </div>

      {/* Supporting Document */}
      {permission.supportingDocument && (
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-gray-700">Dokumen Pendukung:</label>
          <a
            href={permission.supportingDocument}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
          >
            <FiPaperclip className="h-4 w-4" />
            <span>Lihat Dokumen</span>
          </a>
        </div>
      )}

      {/* Admin Notes */}
      {permission.adminNotes && (
        <div className="mb-3 rounded-md border border-yellow-200 bg-yellow-50 p-3">
          <label className="mb-1 block text-sm font-medium text-yellow-800">Catatan Admin:</label>
          <p className="text-sm leading-relaxed text-yellow-900">{permission.adminNotes}</p>
        </div>
      )}

      {/* Status Badge */}
      <div className="flex justify-end">
        <span
          className="rounded-md px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: statusColor }}
        >
          Status: {statusText}
        </span>
      </div>
    </div>
  );
}
