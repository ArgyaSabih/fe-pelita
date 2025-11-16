import fetchAPI from "@/utils/api/fetchAPI";

export async function fetchSchedules({ page = 1, pageSize = 10, q = "", sortBy, sortDir } = {}) {
  const res = await fetchAPI.get("/schedules", {
    params: {
      page,
      pageSize,
      q,
      sortBy: sortBy || undefined,
      sortDir: sortDir || undefined,
    },
  });
  const data = res.data;
  let fetchedItems = [];
  let fetchedTotal = 0;

  if (Array.isArray(data)) {
    fetchedItems = data;
    fetchedTotal = data.length;
  } else if (data.items) {
    fetchedItems = data.items;
    fetchedTotal = data.total ?? data.count ?? fetchedItems.length;
  } else if (data.data) {
    fetchedItems = data.data;
    fetchedTotal = data.total ?? data.count ?? fetchedItems.length;
  } else {
    fetchedItems = data.results ?? data.rows ?? [];
    fetchedTotal = data.total ?? data.count ?? fetchedItems.length;
  }

  return { items: fetchedItems, total: fetchedTotal };
}

export async function createSchedule(scheduleData) {
  const res = await fetchAPI.post("/schedules", scheduleData);
  return res.data.data;
}

export async function updateSchedule(scheduleId, scheduleData) {
  const res = await fetchAPI.put(`/schedules/${scheduleId}`, scheduleData);
  return res.data;
}

export async function deleteSchedule(scheduleId) {
  const res = await fetchAPI.delete(`/schedules/${scheduleId}`);
  return res.data;
}

export function matchesQuery(r, q) {
  if (!q) return true;
  const id = String(r._id ?? r.id ?? "");
  const day = String(r.day ?? "").toLowerCase();
  const date = String(r.date ?? "").toLowerCase();
  const time = String(r.time ?? "").toLowerCase();
  const activityField = (() => {
    if (Array.isArray(r.activity)) {
      return r.activity
        .map((a) => {
          if (!a) return "";
          if (typeof a === "string") return a.toLowerCase();
          return (
            (a.subject || a.activity || a.title || "") +
            " " +
            (a.time || "") +
            " " +
            (a.teacher || "")
          ).toLowerCase();
        })
        .join(" ");
    }
    if (!r.activity) return "";
    if (typeof r.activity === "string") return r.activity.toLowerCase();
    return (
      (r.activity.subject || r.activity.activity || r.activity.title || "") +
      " " +
      (r.activity.time || "") +
      " " +
      (r.activity.teacher || "")
    ).toLowerCase();
  })();

  const teacher = String(r.teacher ?? "").toLowerCase();
  const combined = (
    id +
    " " +
    day +
    " " +
    date +
    " " +
    time +
    " " +
    activityField +
    " " +
    teacher
  ).toLowerCase();
  return combined.includes(q);
}

export function filterItems(items, q) {
  const qq = String(q || "")
    .trim()
    .toLowerCase();
  if (!qq) return items.slice();
  return items.filter((r) => matchesQuery(r, qq));
}

export function sortItems(items, sortBy, sortDir) {
  if (!sortBy) return items.slice();
  const copy = items.slice();
  copy.sort((a, b) => {
    if (sortBy === "date") {
      const parseDate = (v) => {
        try {
          const d = v ? new Date(v) : null;
          return d && !isNaN(d) ? d.getTime() : 0;
        } catch (e) {
          return 0;
        }
      };
      const da = parseDate(a.date ?? (Array.isArray(a.activity) ? a.activity[0]?.date : undefined));
      const db = parseDate(b.date ?? (Array.isArray(b.activity) ? b.activity[0]?.date : undefined));
      return da - db;
    }
    const ta = String(
      a.time ?? (Array.isArray(a.activity) ? a.activity[0]?.time : a.activity?.time) ?? "",
    ).slice(0, 5);
    const tb = String(
      b.time ?? (Array.isArray(b.activity) ? b.activity[0]?.time : b.activity?.time) ?? "",
    ).slice(0, 5);
    if (ta === tb) return 0;
    return ta.localeCompare(tb);
  });
  if (sortDir === "desc") copy.reverse();
  return copy;
}

export function renderField(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") {
    if (Array.isArray(value)) return value.join(", ");
    return (
      value.name ||
      value.title ||
      value.subject ||
      value.activity ||
      value.time ||
      value.teacher ||
      JSON.stringify(value)
    );
  }
  return String(value);
}

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
    console.error("Failed to fetch user profile:", e.response?.data || e.message);
    return { username: "", email: "" };
  }
}

export const formatDateToIndonesian = (dateString) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const date = new Date(dateString);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const transformSchedulePayload = (formData) => ({
  day: formData.day,
  date: formatDateToIndonesian(formData.date),
  activity: [
    {
      time: formData.time,
      subject: formData.activity,
      teacher: formData.teacher,
    },
  ],
});
