"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineLock,
  AiOutlineNotification,
  AiOutlineUser,
  AiOutlineMessage,
} from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import Swal from "sweetalert2";

const items = [
  { href: "/admin", label: "Overview", icon: AiOutlineHome },
  { href: "/admin/schedule", label: "Schedule", icon: AiOutlineCalendar },
  { href: "/admin/permission", label: "Permission", icon: AiOutlineLock },
  { href: "/admin/announcement", label: "Announcement", icon: AiOutlineNotification },
  { href: "/admin/child", label: "Child", icon: AiOutlineUser },
  { href: "/admin/feedback", label: "Feedback", icon: AiOutlineMessage },
];

function normalizePath(p) {
  if (!p) return "/";
  return p.replace(/\/+$/, "") || "/";
}

export default function Sidebar() {
  const pathname = normalizePath(usePathname() || "/admin");
  const router = useRouter();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "red",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        localStorage.removeItem("accessToken");
      } catch (e) {
        // ignore
      }
      // remove cookies if present
      try {
        document.cookie = `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `role=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      } catch (e) {
        // ignore
      }

      router.push("/login");
    }
  };

  return (
    <aside className="font-adlam-display-regular bg-dark-500 flex min-h-screen w-72 flex-col items-stretch px-6 py-6 text-white">
      <div className="mb-4 flex h-[6rem] w-full items-center px-2 pr-10">
        <div className="relative h-full w-[15rem]">
          <Image
            src="/assets/favicon/logo-desktop-admin.webp"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon;
            const itemPath = normalizePath(item.href);
            const active =
              pathname === itemPath || (itemPath !== "/admin" && pathname.startsWith(itemPath));
            return (
              <li key={item.href} className="px-2">
                <Link
                  href={item.href}
                  className={`group flex items-center gap-4 rounded-lg px-4 py-3 transition-colors duration-150 ${
                    active ? "bg-white text-black" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-[1.1rem]">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 px-2">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full cursor-pointer items-center gap-4 rounded-lg bg-red-500 px-4 py-3 text-white hover:opacity-90"
          >
            <CiLogout className="h-6 w-6" />
            <span className="text-[1.1rem]">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
