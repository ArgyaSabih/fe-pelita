import { useState, useEffect } from "react";
import {
  fetchUser,
  fetchPermissionLetters,
  filterPermissionLetters,
  approvePermissionLetter,
  rejectPermissionLetter,
} from "@/utils/admin/permissionHelper";
import Swal from "sweetalert2";

export function usePermissionManagementAdmin(pageSize = 10) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ username: "", email: "" });
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Fetch permission letters from API
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { items: fetchedItems, total: fetchedTotal } = await fetchPermissionLetters({
          page,
          pageSize,
          q: query,
        });

        if (!mounted) return;

        const normalizedQuery = String(query || "")
          .trim()
          .toLowerCase();

        // Filter locally if needed
        const filtered = normalizedQuery
          ? filterPermissionLetters(fetchedItems, normalizedQuery)
          : fetchedItems;

        // Sort by createdAt descending (newest first)
        const sorted = [...filtered].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });

        const startIndex = (page - 1) * pageSize;
        setItems(sorted.slice(startIndex, startIndex + pageSize));
        setTotal(sorted.length);
      } catch (err) {
        if (!mounted) return;
        setItems([]);
        setTotal(0);
        setError(err.message || String(err));
        console.error("Failed to fetch permission letters:", err);
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
    setSelectedPermission(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  // Action Handlers
  const handleApprove = async (permission, adminNotes = "") => {
    try {
      const permissionId = permission._id || permission.id;
      await approvePermissionLetter(permissionId, adminNotes);
      closeModalAndRefresh(setIsApproveModalOpen);
      showAlert("success", "Surat izin berhasil disetujui!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal menyetujui surat izin";
      showAlert("error", errorMsg);
    }
  };

  const handleReject = async (permission, adminNotes = "") => {
    try {
      const permissionId = permission._id || permission.id;
      await rejectPermissionLetter(permissionId, adminNotes);
      closeModalAndRefresh(setIsRejectModalOpen);
      showAlert("success", "Surat izin berhasil ditolak!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal menolak surat izin";
      showAlert("error", errorMsg);
    }
  };

  // Modal Handlers
  const handleApproveClick = (permission) => {
    setSelectedPermission(permission);
    setIsApproveModalOpen(true);
  };

  const handleRejectClick = (permission) => {
    setSelectedPermission(permission);
    setIsRejectModalOpen(true);
  };

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
    isApproveModalOpen,
    isRejectModalOpen,
    selectedPermission,

    // Handlers
    goTo,
    handleApprove,
    handleReject,
    handleApproveClick,
    handleRejectClick,
    closeModalAndRefresh,
    setIsApproveModalOpen,
    setIsRejectModalOpen,
  };
}
