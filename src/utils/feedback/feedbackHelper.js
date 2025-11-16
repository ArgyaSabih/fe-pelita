import fetchAPI from "@/utils/api/fetchAPI";

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

export async function fetchFeedbacks({ page = 1, pageSize = 10, q = "" }) {
  const res = await fetchAPI.get(`/feedbacks`, {
    params: { page, pageSize, q },
    withCredentials: true,
  });

  return {
    items: res.data.data || [],
    total: res.data.count || 0,
  };
}

export async function fetchFeedbacksByParent(parentId) {
  const res = await fetchAPI.get(`/feedbacks/user/${parentId}`);
  return {
    items: res.data.data,
    total: res.data.data.length
  };
}

export async function createFeedback(payload) {
  const res = await fetchAPI.post("/feedbacks", payload);
  return res.data.data;
}

export async function updateFeedback(id, payload) {
  const res = await fetchAPI.put(`/feedbacks/${id}`, payload);
  return res.data.data;
}

export async function deleteFeedback(id) {
  const res = await fetchAPI.delete(`/feedbacks/${id}`);
  return res.data.data;
}

export function filterFeedbacks(items, query) {
  if (!query) return items;

  const lowerQuery = query.toLowerCase();

  return items.filter((item) => {
    const parentName   = String(item.parent?.name || "").toLowerCase();
    const parentEmail  = String(item.parent?.email || "").toLowerCase();
    const type         = String(item.type || "").toLowerCase();
    const content      = String(item.content || "").toLowerCase();
    const createdAt    = String(item.createdAt || "").toLowerCase();

    return (
      parentName.includes(lowerQuery) ||
      parentEmail.includes(lowerQuery) ||
      type.includes(lowerQuery) ||
      content.includes(lowerQuery) ||
      createdAt.includes(lowerQuery)
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

