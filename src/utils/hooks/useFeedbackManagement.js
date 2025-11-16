import { useState, useEffect } from "react";
import {
  fetchUser,
  fetchFeedbacks,
  fetchFeedbacksByParent,
  filterFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "@/utils/feedback/feedbackHelper";

export function useFeedbackManagement({
  pageSize = 10,
  mode = "admin",
  parentId = null
}) {
  // profile
  const [user, setUser] = useState(null);

  // search + pagination
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // data
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // loading & error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // refresh trigger
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // load user only once
  useEffect(() => {
    fetchUser().then((u) => setUser(u));
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // MAIN FETCH
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        let allData = [];

        if (mode === "admin") {
          // 👉 Admin selalu ambil SEMUA tanpa paging
          const res = await fetchFeedbacks({ page: 1, pageSize: 99999 });
          allData = res.items || [];
        } else {
          // 👉 User hanya ambil feedback dari parentId
          if (!parentId) return;
          const res = await fetchFeedbacksByParent(parentId);
          allData = res.items || [];
        }

        if (!mounted) return;

        // search filter
        const normalized = query.trim().toLowerCase();
        const filtered = normalized
          ? filterFeedbacks(allData, normalized)
          : allData;

        // client-side pagination
        const start = (page - 1) * pageSize;
        const paginated = filtered.slice(start, start + pageSize);

        setItems(paginated);
        setTotal(filtered.length);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Gagal memuat data");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false };

  }, [page, query, refreshTrigger, parentId, mode, pageSize]);

  // Reset page saat query berubah
  const setQuerySafe = (q) => {
    setQuery(q);
    setPage(1);
  };

  // pagination
  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // CRUD
  const refresh = () => setRefreshTrigger((n) => n + 1);

  return {
    query,
    setQuery: setQuerySafe,
    page,
    totalPages,
    items,
    user,
    loading,
    error,

    goTo,

    // CRUD ops
    async handleCreateFeedback(data) {
      await createFeedback(data);
      refresh();
      setPage(1);
    },
    async handleUpdateFeedback(data) {
      await updateFeedback(data._id, data);
      refresh();
    },
    async handleConfirmDelete(data) {
      await deleteFeedback(data._id);
      refresh();
    },
  };
}
