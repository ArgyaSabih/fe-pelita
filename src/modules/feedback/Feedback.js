"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  fetchUser,
  fetchFeedbacksByParent,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "@/utils/feedback/feedbackHelper";
import { FiSearch, FiPlus } from "react-icons/fi";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import ModalCreateFeedback from "@/components/feedback/ModalCreateFeedback";
import ModalUpdateFeedback from "@/components/feedback/ModalUpdateFeedback";
import ModalDeleteFeedback from "@/components/feedback/ModalDeleteFeedback";

export default function Feedback() {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const loadFeedbacks = async (parentId) => {
    setLoading(true);
    setError(null);

    try {
      const { items } = await fetchFeedbacksByParent(parentId);
      setAllFeedbacks(items);
    } catch (err) {
      console.error("Failed to fetch feedbacks:", err);
      setError(err.response?.data?.message || "Gagal memuat feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      // ambil profil user
      const u = await fetchUser();
      setUser(u);

      // kalau user ada, ambil feedback berdasarkan parentId
      if (u?.id) {
        await loadFeedbacks(u.id);
      }
    };
    load();
  }, []);

  const totalPages = Math.ceil(allFeedbacks.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const feedbacks = allFeedbacks.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // modal handlers
  const openCreateModal = () => setIsModalOpen(true);
  const closeCreateModal = () => setIsModalOpen(false);

  const openUpdateModal = (fb) => {
    setSelectedFeedback(fb);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (fb) => {
    setSelectedFeedback(fb);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="font-adlam-display-regular relative z-[-10] min-h-screen w-full bg-white pt-32 pb-20">
      {/* Dino image */}
      <div className="pointer-events-none absolute bottom-[-5.5rem] left-[-2.5rem] h-[18rem] w-[18rem] md:h-[20rem] md:w-[20rem]">
        <Image
          src="/assets/schedule/dino-lucu.webp"
          fill
          alt="dino aset"
          className="object-contain"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header With Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-4xl">Feedback</h1>
            <p className="text-lg text-gray-700">Kelola saran dan keluhan Anda</p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-3 rounded-xl bg-[#0A1F44] px-5 py-3 text-white shadow-sm transition hover:bg-[#0d2a5f]"
          >
            <FiPlus className="text-2xl" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-base font-semibold">Tambah</span>
              <span className="text-base font-semibold">Feedback</span>
            </div>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
            <p className="text-lg text-red-700">{error}</p>
          </div>
        )}

        {/* Feedback List */}
        {!loading && !error && (
          <div className="space-y-6">
            {feedbacks.length === 0 ? (
              <div className="rounded-lg border bg-gray-50 p-12 text-center">
                <p className="text-xl text-gray-500">Belum ada feedback</p>
              </div>
            ) : (
              feedbacks.map((fb, idx) => (
                <FeedbackCard
                  key={fb._id || idx}
                  feedback={fb}
                  onEditClick={openUpdateModal}
                  onDeleteClick={openDeleteModal}
                />
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="relative z-20 mt-8 flex items-center justify-end gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors ${
                  currentPage === page
                    ? "bg-yellow-primary-300 text-gray-900"
                    : "hover:bg-yellow-primary-200 bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <ModalCreateFeedback
        isOpen={isModalOpen}
        onClose={closeCreateModal}
        onCreate={async (data) => {
          await createFeedback({
            parentId: user.id,
            type: data.type,
            content: data.content,
          });

          await loadFeedbacks(user.id);
          closeCreateModal();
        }}
      />

      <ModalUpdateFeedback
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        feedbackData={selectedFeedback}
        onUpdate={async (updatedData) => {
          await updateFeedback(selectedFeedback._id, updatedData);
          await loadFeedbacks(user.id);
          setIsUpdateModalOpen(false);
        }}
      />

      <ModalDeleteFeedback
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        feedbackData={selectedFeedback}
        onDelete={async () => {
          await deleteFeedback(selectedFeedback._id);
          await loadFeedbacks(user.id);
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
