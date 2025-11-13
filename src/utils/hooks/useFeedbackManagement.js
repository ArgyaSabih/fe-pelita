import { useState, useEffect } from "react";
import {
  fetchFeedbacks,
  filterFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "@/utils/feedback/feedbackHelper";
import Swal from "sweetalert2";

export function useFeedbackManagement(pageSize = 10) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Fetch feedbacks from API
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { items: fetchedItems, total: fetchedTotal } = await fetchFeedbacks({
          page,
          pageSize,
          q: query,
        });

        if (!mounted) return;

        const normalizedQuery = String(query || "").trim().toLowerCase();
        
        // Filter locally if needed
        const filtered = normalizedQuery
          ? filterFeedbacks(fetchedItems, normalizedQuery)
          : fetchedItems;
        
        const startIndex = (page - 1) * pageSize;
        setItems(filtered.slice(startIndex, startIndex + pageSize));
        setTotal(filtered.length);
      } catch (err) {
        if (!mounted) return;
        setItems([]);
        setTotal(0);
        setError(err.message || String(err));
        console.error("Failed to fetch feedbacks:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [page, pageSize, query, refreshTrigger]);

  // Pagination Handler
  const goTo = (targetPage) => {
    const validPage = Math.min(Math.max(1, targetPage), totalPages);
    setPage(validPage);
  };

  // Helper Functions
  const showAlert = (type, message) => {
    const config = {
      success: {
        icon: "success",
        title: "Berhasil!",
        confirmButtonColor: "#38bdf8",
      },
      error: {
        icon: "error",
        title: "Error!",
        confirmButtonColor: "#ef4444",
      },
    };

    Swal.fire({
      ...config[type],
      text: message,
    });
  };

  const closeModalAndRefresh = (setModalOpen) => {
    setModalOpen(false);
    setSelectedFeedback(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  // CRUD Handlers
  const handleCreateFeedback = async (feedbackData) => {
    try {
      await createFeedback(feedbackData);
      setIsModalOpen(false);
      setRefreshTrigger((prev) => prev + 1);
      setPage(1);
      showAlert("success", "Feedback berhasil dibuat!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal membuat feedback";
      showAlert("error", errorMsg);
    }
  };

  const handleUpdateFeedback = async (formData) => {
    try {
      const feedbackId = formData._id || formData.id;
      await updateFeedback(feedbackId, {
        type: formData.type,
        content: formData.content,
      });
      closeModalAndRefresh(setIsUpdateModalOpen);
      showAlert("success", "Feedback berhasil diupdate!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal mengupdate feedback";
      showAlert("error", errorMsg);
    }
  };

  const handleConfirmDelete = async (feedback) => {
    try {
      const feedbackId = feedback._id || feedback.id;
      await deleteFeedback(feedbackId);
      closeModalAndRefresh(setIsDeleteModalOpen);
      showAlert("success", "Feedback berhasil dihapus!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal menghapus feedback";
      showAlert("error", errorMsg);
    }
  };

  // Modal Handlers
  const handleEditClick = (feedback) => {
    setSelectedFeedback(feedback);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (feedback) => {
    setSelectedFeedback(feedback);
    setIsDeleteModalOpen(true);
  };

  const openCreateModal = () => setIsModalOpen(true);
  const closeCreateModal = () => setIsModalOpen(false);

  return {
    // State
    query,
    setQuery,
    page,
    totalPages,
    items,
    loading,
    error,

    // Modal States
    isModalOpen,
    isUpdateModalOpen,
    isDeleteModalOpen,
    selectedFeedback,

    // Handlers
    goTo,
    handleCreateFeedback,
    handleUpdateFeedback,
    handleConfirmDelete,
    handleEditClick,
    handleDeleteClick,
    openCreateModal,
    closeCreateModal,
    closeModalAndRefresh,

    // Modal setters for manual control
    setIsUpdateModalOpen,
    setIsDeleteModalOpen,
  };
}