import axios from "axios";
import fetchAPI from "@/utils/api/fetchAPI";

// Create API instance for permission letters (baseURL can be moved to env later)
const permissionAPI = axios.create({
  baseURL: "http://localhost:8000/api",
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
    const user = res.data.data.user;

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (err) {
    console.error("Failed to fetch user profile:", err);
    return null;
  }
}

export async function fetchPermissionLetters() {
  const res = await permissionAPI.get("/permission-letters");
  return {
    items: res.data.data || [],
    total: res.data.data?.length || 0,
  };
}

export async function fetchPermissionLetterById(id) {
  const res = await permissionAPI.get(`/permission-letters/${id}`);
  return res.data.data;
}

export async function createPermissionLetter(payload) {
  try {
    const res = await permissionAPI.post("/permission-letters", payload);
    return res.data.data;
  } catch (error) {
    // Log the full error for debugging
    console.error("API Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });
    throw error; // Re-throw to let the caller handle it
  }
}

export async function updatePermissionLetter(id, payload) {
  const res = await permissionAPI.put(`/permission-letters/${id}`, payload);
  return res.data.data;
}

export async function deletePermissionLetter(id) {
  const res = await permissionAPI.delete(`/permission-letters/${id}`);
  return res.data.data;
}

export function formatDate(dateString) {
  if (!dateString) return "-";
  
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
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

