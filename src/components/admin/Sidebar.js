"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineLock,
  AiOutlineNotification,
  AiOutlineUser,
  AiOutlineMessage,
} from "react-icons/ai";
import Image from "next/image";

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

  return (
    <aside className="font-adlam-display-regular bg-dark-500 flex min-h-screen w-72 flex-col items-stretch px-6 py-6 text-white">
      <div className="mb-4 flex flex-[0.1] items-center px-2 pr-10">
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
      </nav>
    </aside>
  );
}
