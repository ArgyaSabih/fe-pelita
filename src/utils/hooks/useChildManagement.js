import { useState, useEffect } from "react";
import {
  fetchChildren,
  filterItems,
  sortItems,
  fetchUser,
  createChild,
  updateChild,
  deleteChild,
} from "@/utils/admin/childHelper";
import Swal from "sweetalert2";

export function useChildManagement(pageSize = 10) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ username: "", email: "" });
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Fetch children from API
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { items: fetchedItems, total: fetchedTotal } = await fetchChildren({
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
        console.error("Failed to fetch children:", err);
        setItems([]);
        setTotal(0);
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
    setSelectedChild(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  // CRUD Handlers
  const handleCreateChild = async (childData, transformPayload) => {
    try {
      await createChild(transformPayload(childData));
      setIsModalOpen(false);
      setRefreshTrigger((prev) => prev + 1);
      setPage(1);
      showAlert("success", "Data anak berhasil dibuat!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal membuat data anak";
      showAlert("error", errorMsg);
    }
  };

  const handleUpdateChild = async (formData, transformPayload) => {
    try {
      await updateChild(formData.id, transformPayload(formData));
      closeModalAndRefresh(setIsUpdateModalOpen);
      showAlert("success", "Data anak berhasil diupdate!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal mengupdate data anak";
      showAlert("error", errorMsg);
    }
  };

  const handleConfirmDelete = async (child) => {
    try {
      const childId = child._id || child.id;
      await deleteChild(childId);
      closeModalAndRefresh(setIsDeleteModalOpen);
      showAlert("success", "Data anak berhasil dihapus!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal menghapus data anak";
      showAlert("error", errorMsg);
    }
  };

  // Modal Handlers
  const handleDetailClick = (child) => {
    setSelectedChild(child);
    setIsDetailModalOpen(true);
  };

  const handleEditClick = (child) => {
    setSelectedChild(child);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (child) => {
    setSelectedChild(child);
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
    isDetailModalOpen,
    selectedChild,

    // Handlers
    goTo,
    toggleSort,
    handleCreateChild,
    handleUpdateChild,
    handleConfirmDelete,
    handleDetailClick,
    handleEditClick,
    handleDeleteClick,
    openCreateModal,
    closeCreateModal,
    closeModalAndRefresh,

    // Modal setters for manual control
    setIsUpdateModalOpen,
    setIsDeleteModalOpen,
    setIsDetailModalOpen,
  };
}

