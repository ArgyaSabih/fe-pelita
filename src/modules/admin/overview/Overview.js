"use client";
import { useEffect, useState } from "react";
import {
  FiUsers,
  FiFileText,
  FiBell,
  FiCalendar,
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import HeaderAdmin from "./HeaderAdmin";
import fetchAPI from "@/utils/api/fetchAPI";

export default function Overview() {
  const [user, setUser] = useState({ username: "", email: "" });
  const [stats, setStats] = useState({
    totalChildren: 0,
    totalPermissions: 0,
    pendingPermissions: 0,
    approvedPermissions: 0,
    rejectedPermissions: 0,
    totalAnnouncements: 0,
    totalFeedbacks: 0,
    totalSchedules: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userRes = await fetchAPI.get("/users/profile");
        const userData = userRes.data.data.user;
        setUser({
          username: userData.name || userData.username || "",
          email: userData.email || "",
        });

        // Fetch statistics
        const [childrenRes, permissionsRes, announcementsRes, feedbacksRes, schedulesRes] =
          await Promise.all([
            fetchAPI.get("/children").catch(() => ({ data: { data: [] } })),
            fetchAPI.get("/permission-letters/all").catch(() => ({ data: { data: [] } })),
            fetchAPI.get("/announcements").catch(() => ({ data: { data: [] } })),
            fetchAPI.get("/feedbacks").catch(() => ({ data: { data: [] } })),
            fetchAPI.get("/schedules").catch(() => ({ data: { data: [] } })),
          ]);

        const children = childrenRes.data.data || [];
        const permissions = permissionsRes.data.data || [];
        const announcements = announcementsRes.data.data || [];
        const feedbacks = feedbacksRes.data.data || [];
        const schedules = schedulesRes.data.data || [];

        setStats({
          totalChildren: children.length,
          totalPermissions: permissions.length,
          pendingPermissions: permissions.filter((p) => p.status === "pending").length,
          approvedPermissions: permissions.filter((p) => p.status === "approved").length,
          rejectedPermissions: permissions.filter((p) => p.status === "rejected").length,
          totalAnnouncements: announcements.length,
          totalFeedbacks: feedbacks.length,
          totalSchedules: schedules.length,
        });
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Anak",
      value: stats.totalChildren,
      icon: FiUsers,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Total Surat Izin",
      value: stats.totalPermissions,
      icon: FiFileText,
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
    {
      title: "Izin Pending",
      value: stats.pendingPermissions,
      icon: FiClock,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    {
      title: "Izin Disetujui",
      value: stats.approvedPermissions,
      icon: FiCheckCircle,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      title: "Izin Ditolak",
      value: stats.rejectedPermissions,
      icon: FiXCircle,
      color: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      title: "Pengumuman",
      value: stats.totalAnnouncements,
      icon: FiBell,
      color: "bg-indigo-500",
      textColor: "text-indigo-500",
    },
    {
      title: "Feedback",
      value: stats.totalFeedbacks,
      icon: FiMessageSquare,
      color: "bg-pink-500",
      textColor: "text-pink-500",
    },
    {
      title: "Jadwal",
      value: stats.totalSchedules,
      icon: FiCalendar,
      color: "bg-teal-500",
      textColor: "text-teal-500",
    },
  ];

  return (
    <div className="font-adlam-display-regular min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderAdmin username={user.username} email={user.email} />

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Selamat Datang, {user.username || "Admin"}! 👋
          </h1>
          <p className="mt-2 text-gray-600">Berikut adalah ringkasan sistem PELITA hari ini</p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Memuat data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`rounded-full ${stat.color} p-3`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats Section */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Permission Status Chart */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Status Surat Izin</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-700">Pending</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.pendingPermissions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <span className="text-gray-700">Disetujui</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.approvedPermissions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                      <span className="text-gray-700">Ditolak</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.rejectedPermissions}</span>
                  </div>
                </div>
              </div>

              {/* System Overview */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Ringkasan Sistem</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-700">Total Data Anak</span>
                    <span className="font-semibold text-blue-600">{stats.totalChildren}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-700">Total Pengumuman</span>
                    <span className="font-semibold text-indigo-600">
                      {stats.totalAnnouncements}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-700">Total Feedback</span>
                    <span className="font-semibold text-pink-600">{stats.totalFeedbacks}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Total Jadwal</span>
                    <span className="font-semibold text-teal-600">{stats.totalSchedules}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-md">
              <h3 className="mb-2 text-xl font-bold">Aksi Cepat</h3>
              <p className="mb-4 text-blue-100">
                Gunakan sidebar untuk mengakses berbagai fitur manajemen
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <a
                  href="/admin/child"
                  className="rounded-lg bg-white/20 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/30"
                >
                  <FiUsers className="mx-auto mb-2 h-6 w-6" />
                  <span className="text-sm">Kelola Anak</span>
                </a>
                <a
                  href="/admin/permission"
                  className="rounded-lg bg-white/20 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/30"
                >
                  <FiFileText className="mx-auto mb-2 h-6 w-6" />
                  <span className="text-sm">Surat Izin</span>
                </a>
                <a
                  href="/admin/announcement"
                  className="rounded-lg bg-white/20 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/30"
                >
                  <FiBell className="mx-auto mb-2 h-6 w-6" />
                  <span className="text-sm">Pengumuman</span>
                </a>
                <a
                  href="/admin/schedule"
                  className="rounded-lg bg-white/20 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/30"
                >
                  <FiCalendar className="mx-auto mb-2 h-6 w-6" />
                  <span className="text-sm">Jadwal</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
