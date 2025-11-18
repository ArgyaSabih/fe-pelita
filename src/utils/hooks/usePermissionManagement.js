import { useState, useEffect } from "react";
import {
  fetchUser,
  fetchPermissionLetters,
  createPermissionLetter,
  updatePermissionLetter,
  deletePermissionLetter,
} from "@/utils/permission/permissionHelper";

export function usePermissionManagement() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load user on mount
  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        if (mounted) setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch permission letters
  useEffect(() => {
    let mounted = true;

    const loadPermissionLetters = async () => {
      setLoading(true);
      setError(null);

      try {
        const { items: fetchedItems } = await fetchPermissionLetters();
        if (!mounted) return;

        // Sort by createdAt ascending (oldest first) - Surat Izin 1, 2, 3...
        const sorted = [...fetchedItems].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateA - dateB;
        });

        setItems(sorted);
      } catch (err) {
        if (!mounted) return;
        setItems([]);
        setError(err.response?.data?.message || err.message || "Gagal memuat surat izin");
        console.error("Failed to fetch permission letters:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadPermissionLetters();
    return () => {
      mounted = false;
    };
  }, [refreshTrigger]);

  const refresh = () => setRefreshTrigger((n) => n + 1);

  return {
    user,
    items,
    loading,
    error,
    async handleCreate(data) {
      await createPermissionLetter(data);
      refresh();
    },
    async handleUpdate(id, data) {
      await updatePermissionLetter(id, data);
      refresh();
    },
    async handleDelete(id) {
      await deletePermissionLetter(id);
      refresh();
    },
  };
}

