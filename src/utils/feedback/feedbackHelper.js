import fetchAPI from "@/utils/api/fetchAPI";

export async function fetchFeedbacks({ page = 1, pageSize = 10, q = "" } = {}) {
  const res = await fetchAPI.get("/feedbacks", {
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
}

export async function createFeedback(feedbackData) {
  const res = await fetchAPI.post("/feedbacks", feedbackData);
  return res.data.data;
}

export async function updateFeedback(feedbackId, feedbackData) {
  const res = await fetchAPI.put(`/feedbacks/${feedbackId}`, feedbackData);
  return res.data;
}

export async function deleteFeedback(feedbackId) {
  const res = await fetchAPI.delete(`/feedbacks/${feedbackId}`);
  return res.data;
}

export function filterFeedbacks(items, query) {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    const parent = String(item.parent?.email || "").toLowerCase();
    const type = String(item.type || "").toLowerCase();
    const content = String(item.content || "").toLowerCase();
    const createdAt = String(item.createdAt || "").toLowerCase();
    return parent.includes(lowerQuery) || type.includes(lowerQuery) || content.includes(lowerQuery) || createdAt.includes(lowerQuery);
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

