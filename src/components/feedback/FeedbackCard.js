"use client";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { formatDate, truncateText } from "@/utils/feedback/feedbackHelper";

export default function FeedbackCard({ feedback, onEditClick, onDeleteClick }) {
  const isSaran = feedback.type?.toLowerCase() === "saran";

  const bgColor = isSaran ? "bg-[#ECF7FC]" : "bg-red-100";

  return (
    <div className={`rounded-lg border-[#A9DCF1] border-r-4 border-b-4 ${bgColor} p-5 shadow-sm hover:shadow-md transition-shadow`}>
      
      {/* Header top row */}
      <div className="mb-3 flex items-start justify-between">
        
        {/* Title = ID + type */}
        <h3 className="text-xl font-semibold text-gray-900 flex-1 pr-4">
          ID {String(feedback._id).slice(-4)}: {feedback.type}
        </h3>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEditClick(feedback)}
            className="cursor-pointer rounded-md bg-orange-400 p-2 text-white hover:bg-orange-500 transition-colors"
            aria-label="Edit feedback"
          >
            <FiEdit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDeleteClick(feedback)}
            className="cursor-pointer rounded-md bg-red-500 p-2 text-white hover:bg-red-600 transition-colors"
            aria-label="Delete feedback"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Date */}
      <p className="mb-2 text-sm text-gray-600">
        {formatDate(feedback.createdAt)}
      </p>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed">
        {truncateText(feedback.content, 150)}
      </p>
    </div>
  );
}
