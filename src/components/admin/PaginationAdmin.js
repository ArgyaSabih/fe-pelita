"use client";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function PaginationAdmin({ page = 1, totalPages = 1, onPageChange = () => {} }) {
  function renderPageButtons() {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const last = totalPages;

    let start = Math.floor((page - 1) / 3) * 3 + 1;
    if (start < 1) start = 1;

    if (start + 2 >= last) {
      const s = Math.max(1, last - 4);
      const pages = [];
      for (let i = s; i <= last; i++) pages.push(i);
      return pages;
    }

    return [start, start + 1, start + 2, "...", last];
  }

  return (
    <nav className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="cursor-pointer px-3 py-1 disabled:opacity-50"
      >
        <FaChevronLeft />
      </button>

      {renderPageButtons().map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(Number(p))}
            className={`cursor-pointer px-3 py-1 ${page === p ? "rounded bg-sky-100" : ""}`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="cursor-pointer px-3 py-1 disabled:opacity-50"
      >
        <FaChevronRight />
      </button>
    </nav>
  );
}
