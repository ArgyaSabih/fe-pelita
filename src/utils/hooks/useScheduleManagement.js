import { useState, useEffect } from "react";
import {
  fetchSchedules,
  filterItems,
  sortItems,
  fetchUser,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "@/utils/admin/scheduleHelper";
import Swal from "sweetalert2";

const sample = Array.from({ length: 70 }).map((_, i) => ({
  id: i + 1,
  day: i % 2 === 0 ? "Senin" : "Selasa",
  date: i % 2 === 0 ? "3 November 2025" : "4 November 2025",
  time: "08:00",
  activity: "Senam Pagi",
  teacher: "Budi Speed",
}));

export function useScheduleManagement(pageSize = 10) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(sample.length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ username: "", email: "" });
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Fetch schedules from API
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { items: fetchedItems, total: fetchedTotal } = await fetchSchedules({
          page,
          pageSize,
          q: query,
          sortBy,
          sortDir,
        });

        if (!mounted) return;

        const normalizedQuery = String(query || "")
          .trim()
          .toLowerCase();
        const isServerPaginated = fetchedTotal > fetchedItems.length;

        if (isServerPaginated) {
          setItems(fetchedItems);
          setTotal(fetchedTotal);
        } else {
          const filtered = normalizedQuery
            ? filterItems(fetchedItems, normalizedQuery)
            : fetchedItems;
          const sorted = sortItems(filtered, sortBy, sortDir);
          const startIndex = (page - 1) * pageSize;

          setItems(sorted.slice(startIndex, startIndex + pageSize));
          setTotal(sorted.length);
        }
      } catch (err) {
        if (!mounted) return;

        const normalizedQuery = query.toLowerCase();
        const fallback = sample.filter((r) =>
          Object.values(r).some((val) => String(val).toLowerCase().includes(normalizedQuery)),
        );
        const startIndex = (page - 1) * pageSize;

        setItems(fallback.slice(startIndex, startIndex + pageSize));
        setTotal(fallback.length);
        setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [page, pageSize, query, sortBy, sortDir, refreshTrigger]);

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

  // Pagination & Sorting Handlers
  const goTo = (targetPage) => {
    const validPage = Math.min(Math.max(1, targetPage), totalPages);
    setPage(validPage);
  };

  const toggleSort = (column) => {
    if (sortBy !== column) {
      setSortBy(column);
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortDir("asc");
    } else {
      setSortBy(null);
      setSortDir("desc");
    }
    setPage(1);
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
    setSelectedSchedule(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  // CRUD Handlers
  const handleCreateSchedule = async (scheduleData, transformPayload) => {
    try {
      await createSchedule(transformPayload(scheduleData));
      setIsModalOpen(false);
      setRefreshTrigger((prev) => prev + 1);
      setPage(1);
      showAlert("success", "Jadwal berhasil dibuat!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal membuat jadwal";
      showAlert("error", errorMsg);
    }
  };

  const handleUpdateSchedule = async (formData, transformPayload) => {
    try {
      await updateSchedule(formData.id, transformPayload(formData));
      closeModalAndRefresh(setIsUpdateModalOpen);
      showAlert("success", "Jadwal berhasil diupdate!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal mengupdate jadwal";
      showAlert("error", errorMsg);
    }
  };

  const handleConfirmDelete = async (schedule) => {
    try {
      const scheduleId = schedule._id || schedule.id;
      await deleteSchedule(scheduleId);
      closeModalAndRefresh(setIsDeleteModalOpen);
      showAlert("success", "Jadwal berhasil dihapus!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal menghapus jadwal";
      showAlert("error", errorMsg);
    }
  };

  // Modal Handlers
  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (schedule) => {
    setSelectedSchedule(schedule);
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
    sortBy,
    sortDir,

    // Modal States
    isModalOpen,
    isUpdateModalOpen,
    isDeleteModalOpen,
    selectedSchedule,

    // Handlers
    goTo,
    toggleSort,
    handleCreateSchedule,
    handleUpdateSchedule,
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
