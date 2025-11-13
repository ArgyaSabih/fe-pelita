import { useState, useEffect } from "react";
import {
  fetchAnnouncements,
  filterAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/utils/admin/announcementHelper";
import { fetchUser } from "@/utils/admin/scheduleHelper";
import Swal from "sweetalert2";

export function useAnnouncementManagement(pageSize = 10) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ username: "", email: "" });
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Fetch announcements from API
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { items: fetchedItems, total: fetchedTotal } = await fetchAnnouncements({
          page,
          pageSize,
          q: query,
        });

        if (!mounted) return;

        const normalizedQuery = String(query || "").trim().toLowerCase();
        
        // Filter locally if needed
        const filtered = normalizedQuery
          ? filterAnnouncements(fetchedItems, normalizedQuery)
          : fetchedItems;
        
        const startIndex = (page - 1) * pageSize;
        setItems(filtered.slice(startIndex, startIndex + pageSize));
        setTotal(filtered.length);
      } catch (err) {
        if (!mounted) return;
        setItems([]);
        setTotal(0);
        setError(err.message || String(err));
        console.error("Failed to fetch announcements:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [page, pageSize, query, refreshTrigger]);

  // Fetch user info on mount
  useEffect(() => {
    let mounted = true;

    const fetchUserData = async () => {
      try {
        const userData = await fetchUser();
        if (mounted) setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUserData();
    return () => {
      mounted = false;
    };
  }, []);

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
    setSelectedAnnouncement(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  // CRUD Handlers
  const handleCreateAnnouncement = async (announcementData) => {
    try {
      await createAnnouncement(announcementData);
      setIsModalOpen(false);
      setRefreshTrigger((prev) => prev + 1);
      setPage(1);
      showAlert("success", "Pengumuman berhasil dibuat!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal membuat pengumuman";
      showAlert("error", errorMsg);
    }
  };

  const handleUpdateAnnouncement = async (formData) => {
    try {
      const announcementId = formData._id || formData.id;
      await updateAnnouncement(announcementId, {
        title: formData.title,
        content: formData.content,
      });
      closeModalAndRefresh(setIsUpdateModalOpen);
      showAlert("success", "Pengumuman berhasil diupdate!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal mengupdate pengumuman";
      showAlert("error", errorMsg);
    }
  };

  const handleConfirmDelete = async (announcement) => {
    try {
      const announcementId = announcement._id || announcement.id;
      await deleteAnnouncement(announcementId);
      closeModalAndRefresh(setIsDeleteModalOpen);
      showAlert("success", "Pengumuman berhasil dihapus!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal menghapus pengumuman";
      showAlert("error", errorMsg);
    }
  };

  // Modal Handlers
  const handleEditClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (announcement) => {
    setSelectedAnnouncement(announcement);
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
    user,

    // Modal States
    isModalOpen,
    isUpdateModalOpen,
    isDeleteModalOpen,
    selectedAnnouncement,

    // Handlers
    goTo,
    handleCreateAnnouncement,
    handleUpdateAnnouncement,
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

