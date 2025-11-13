"use client";
import { formatDate } from "@/utils/admin/announcementHelper";
import { AiOutlineCalendar } from "react-icons/ai";

export default function AnnouncementCard({ announcement, index }) {
  // 3 warna bergantian: Pink, Blue, Yellow
  const colors = [
    { bg: "bg-[#FEE9EE]", border: "border-[#FEE9EE]" }, // Pink
    { bg: "bg-[#D4EEF8]", border: "border-[#D4EEF8]" }, // Blue
    { bg: "bg-[#FEE4B8]", border: "border-[#FEE4B8]" }, // Yellow
  ];
  
  const colorIndex = index % 3;
  const bgColor = colors[colorIndex].bg;
  const borderColor = colors[colorIndex].border;

  return (
    <div
      className={`${bgColor} ${borderColor} rounded-2xl border-4 p-6 shadow-md transition-all hover:shadow-lg`}
    >
      {/* Title */}
      <h3 className="mb-3 text-2xl font-bold text-[#112456]">{announcement.title}</h3>

      {/* Date with Icon */}
      <div className="mb-4 flex items-center gap-2 font-['Inter',sans-serif] text-gray-800">
        <AiOutlineCalendar className="h-5 w-5" />
        <span className="text-base font-medium">{formatDate(announcement.dateSent)}</span>
      </div>

      {/* Content */}
      <div className="font-['Inter',sans-serif] text-gray-900">
        <p className="whitespace-pre-wrap leading-relaxed">{announcement.content}</p>
      </div>

      {/* Additional Info Section (if needed) */}
      {announcement.additionalInfo && (
        <div className="mt-4 rounded-lg bg-white/30 p-4 font-['Inter',sans-serif]">
          <p className="font-semibold text-gray-900">Detail:</p>
          <p className="mt-1 text-gray-800">{announcement.additionalInfo}</p>
        </div>
      )}
    </div>
  );
}

