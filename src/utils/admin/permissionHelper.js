import axios from "axios";
import fetchAPI from "@/utils/api/fetchAPI";

// Create API instance for permission letters
const permissionAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Set interceptor for permission API
permissionAPI.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function fetchUser() {
  try {
    const res = await fetchAPI.get("/users/profile");
    const data = res.data.data;
    let u = null;

    if (Array.isArray(data)) {
      u = data[0] ?? null;
    } else if (data.user) {
      u = data.user;
    } else if (data.data) {
      u = data.data;
    } else {
      u = data;
    }

    if (!u) return { username: "", email: "" };
    return {
      username: u.name || u.fullName || u.username || "",
      email: u.email || "",
    };
  } catch (e) {
    console.error("Failed to fetch user:", e);
    return { username: "", email: "" };
  }
}

export async function fetchPermissionLetters({ page = 1, pageSize = 10, q = "" } = {}) {
  try {
    // Use /permission-letters/all endpoint for admin (based on backend routes)
    const res = await permissionAPI.get("/permission-letters/all", {
      params: {
        page,
        pageSize,
        q,
      },
    });

    const data = res.data;
    let fetchedItems = [];
    let fetchedTotal = 0;

    if (Array.isArray(data)) {
      fetchedItems = data;
      fetchedTotal = data.length;
    } else if (data.data) {
      fetchedItems = data.data;
      fetchedTotal = data.count ?? data.total ?? fetchedItems.length;
    } else if (data.items) {
      fetchedItems = data.items;
      fetchedTotal = data.total ?? data.count ?? fetchedItems.length;
    } else {
      fetchedItems = data.results ?? data.rows ?? [];
      fetchedTotal = data.total ?? data.count ?? fetchedItems.length;
    }

    return { items: fetchedItems, total: fetchedTotal };
  } catch (error) {
    console.error("Error fetching permission letters:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      data: error.response?.data,
    });

    // Provide more helpful error message
    if (error.response?.status === 403) {
      throw new Error("Akses ditolak. Pastikan Anda login sebagai admin.");
    }

    throw error;
  }
}

export async function approvePermissionLetter(permissionId, adminNotes = "") {
  const payload = {
    status: "approved",
  };
  if (adminNotes.trim()) {
    payload.adminNotes = adminNotes.trim();
  }
  const res = await permissionAPI.put(`/permission-letters/${permissionId}/status`, payload);
  return res.data;
}

export async function rejectPermissionLetter(permissionId, adminNotes = "") {
  const payload = {
    status: "rejected",
  };
  if (adminNotes.trim()) {
    payload.adminNotes = adminNotes.trim();
  }
  const res = await permissionAPI.put(`/permission-letters/${permissionId}/status`, payload);
  return res.data;
}

export function filterPermissionLetters(items, query) {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    const reason = String(item.reason || "").toLowerCase();
    const status = String(item.status || "").toLowerCase();
    const createdAt = String(item.createdAt || "").toLowerCase();
    const startDate = String(item.startDate || "").toLowerCase();
    const endDate = String(item.endDate || "").toLowerCase();
    const studentName = String(item.studentName || "").toLowerCase();
    const parentName = String(item.parent?.name || "").toLowerCase();
    const parentEmail = String(item.parent?.email || "").toLowerCase();
    const adminNotes = String(item.adminNotes || "").toLowerCase();
    const supportingDocument = String(item.supportingDocument || "").toLowerCase();

    return (
      reason.includes(lowerQuery) ||
      status.includes(lowerQuery) ||
      createdAt.includes(lowerQuery) ||
      startDate.includes(lowerQuery) ||
      endDate.includes(lowerQuery) ||
      studentName.includes(lowerQuery) ||
      parentName.includes(lowerQuery) ||
      parentEmail.includes(lowerQuery) ||
      adminNotes.includes(lowerQuery) ||
      supportingDocument.includes(lowerQuery)
    );
  });
}

export function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

export function truncateText(text, maxLength = 100) {
  if (!text) return "-";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "pending":
      return "#FDC564"; // yellow
    case "approved":
      return "#AECA51"; // green
    case "rejected":
      return "#F26E48"; // red
    default:
      return "#9CA3AF"; // gray
  }
}

export function getStatusText(status) {
  switch (status?.toLowerCase()) {
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return "Unknown";
  }
}
