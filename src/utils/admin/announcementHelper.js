import fetchAPI from "@/utils/api/fetchAPI";

export async function fetchAnnouncements({ page = 1, pageSize = 10, q = "" } = {}) {
  const res = await fetchAPI.get("/announcements", {
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

export async function createAnnouncement(announcementData) {
  const res = await fetchAPI.post("/announcements", announcementData);
  return res.data.data;
}

export async function updateAnnouncement(announcementId, announcementData) {
  const res = await fetchAPI.put(`/announcements/${announcementId}`, announcementData);
  return res.data;
}

export async function deleteAnnouncement(announcementId) {
  const res = await fetchAPI.delete(`/announcements/${announcementId}`);
  return res.data;
}

export function filterAnnouncements(items, query) {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    const title = String(item.title || "").toLowerCase();
    const content = String(item.content || "").toLowerCase();
    const dateSent = String(item.dateSent || "").toLowerCase();
    return title.includes(lowerQuery) || content.includes(lowerQuery) || dateSent.includes(lowerQuery);
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

