"use client";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { formatDate, truncateText } from "@/utils/feedback/feedbackHelper";

export default function FeedbackCard({ feedback, onEditClick, onDeleteClick }) {
  const isSaran = feedback.type?.toLowerCase() === "saran";

  const bgColor = isSaran ? "bg-[#ECF7FC]" : "bg-red-100";

  return (
    <div className={`rounded-lg border-[#A9DCF1] border-r-4 border-b-4 ${bgColor} p-5 shadow-sm hover:shadow-md transition-all`}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        
        {/* Title (ID + Tipe) */}
        <div>
          <p className="text-sm text-gray-600">
            {formatDate(feedback.createdAt)}
          </p>
          <h3 className="text-lg font-semibold text-gray-900">
            ID {String(feedback._id).slice(-4)}: {feedback.type}
          </h3>

          {/* Parent Email */}
          <p className="text-sm text-gray-800 font-medium mt-1">
            {feedback.parent?.email}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 whitespace-pre-line">
        {truncateText(feedback.content, 250)}
      </p>

    </div>
  );
}
