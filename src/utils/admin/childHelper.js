import fetchAPI from "@/utils/api/fetchAPI";

export async function fetchChildren({ page = 1, pageSize = 10, q = "", sortBy, sortDir } = {}) {
  const res = await fetchAPI.get("/children", {
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

export async function createChild(childData) {
  const res = await fetchAPI.post("/children", childData);
  return res.data.data;
}

export async function updateChild(childId, childData) {
  const res = await fetchAPI.put(`/children/${childId}`, childData);
  return res.data;
}

export async function deleteChild(childId) {
  const res = await fetchAPI.delete(`/children/${childId}`);
  return res.data;
}

export function matchesQuery(child, q) {
  if (!q) return true;
  const id = String(child._id ?? child.id ?? "");
  const name = String(child.name ?? "").toLowerCase();
  const invitationCode = String(child.invitationCode ?? "").toLowerCase();
  const classValue = String(child.class ?? "").toLowerCase();
  const parentNames = Array.isArray(child.parents)
    ? child.parents.map((p) => String(p.name ?? p.email ?? "").toLowerCase()).join(" ")
    : "";

  const combined = (id + " " + name + " " + invitationCode + " " + classValue + " " + parentNames).toLowerCase();
  return combined.includes(q);
}

export function filterItems(items, q) {
  const qq = String(q || "")
    .trim()
    .toLowerCase();
  if (!qq) return items.slice();
  return items.filter((child) => matchesQuery(child, qq));
}

export function sortItems(items, sortBy, sortDir) {
  if (!sortBy) return items.slice();
  const copy = items.slice();
  copy.sort((a, b) => {
    if (sortBy === "id") {
      const ida = String(a._id ?? a.id ?? "");
      const idb = String(b._id ?? b.id ?? "");
      return ida.localeCompare(idb);
    }
    if (sortBy === "name") {
      const na = String(a.name ?? "").toLowerCase();
      const nb = String(b.name ?? "").toLowerCase();
      return na.localeCompare(nb);
    }
    if (sortBy === "class") {
      const ca = String(a.class ?? "").toLowerCase();
      const cb = String(b.class ?? "").toLowerCase();
      return ca.localeCompare(cb);
    }
    return 0;
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
      value.email ||
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

export const transformChildPayload = (formData) => ({
  name: formData.name,
  dateOfBirth: formData.dateOfBirth,
  class: formData.class,
  medicalRecord: formData.medicalRecord ? formData.medicalRecord.split(",").map((r) => r.trim()) : [],
  notes: formData.notes || "",
});

