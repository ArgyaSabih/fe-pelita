"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { cn } from "@/utils/cn";
import { memo } from "react";
import Swal from "sweetalert2";

export const navItems = [
  { href: "/schedule", label: "Schedule", type: ["underline"] },
  { href: "/feedback", label: "Feedback", type: ["underline"] },
  { href: "/announcement", label: "Announcement", type: ["underline"] },
  { href: "/permission", label: "Permission", type: ["underline"] },
  { href: "/login", label: "Logout", type: ["logout"] },
  { href: "/profile", label: "Profile", type: ["profile"] },
];

const navItemsType = {
  base: "rounded-[0.5rem] text-black w-full lg:px-[0.9vw] lg:py-[0.7vw] xl:px-3.5 xl:py-2 max-2xl:max-h-9 flex text-[3.5vw] xxs:text-[3.3vw] xs:text-[3vw] sm:text-[2.3vw] md:text-[1.8vw] lg:text-[1.3vw] xl:text-[1.1vw] 2xl:text-[1.1rem] whitespace-nowrap transition-all duration-300 group max-lg:justify-between max-lg:items-center max-lg:text-left max-lg:px-4 max-lg:py-3 lg:justify-center lg:text-center",
  underline:
    "relative inline-block lg:!mr-2 lg:!px-0 hover:font-semibold lg:hover:scale-105 max-lg:flex max-lg:justify-between max-lg:items-center max-lg:w-full max-lg:px-0",
  register:
    "relative bg-blue-primary-200 max-lg:py-4 max-lg:px-4 hover:bg-blue-primary-400 max-lg:justify-center min-w-[6rem]",
  login:
    "relative bg-blue-primary-200 max-lg:py-4 max-lg:px-4 hover:bg-blue-primary-400 max-lg:justify-center min-w-[6rem]",
  profile:
    "relative bg-dark-500 text-white max-lg:py-4 max-lg:px-4 hover:bg-dark-800 max-lg:justify-center items-center min-w-[7rem]",
  bellIcon:
    "flex-none self-center lg:mt-0 mr-2 block w-[0.9rem] sm:w-[1.1rem] lg:w-[1.3rem] items-center lg:pt-0.5 2xl:w-[1.3rem] h-auto",
  activeUnderline: "absolute bottom-0 left-0 h-0.5 w-full bg-black",
  logout:
    "relative cursor-pointer bg-blue-primary-200 max-lg:py-4 max-lg:px-4 hover:bg-blue-primary-400 max-lg:justify-center min-w-[6rem]",
};

export const RenderNavItem = memo(
  ({ item, onNavigate = () => {} }) => {
    const pathname = usePathname();
    const router = useRouter();
    const types = Array.isArray(item.type) ? item.type : [item.type];
    const typeClasses = types.map((type) => navItemsType[type] || "").join(" ");
    const combinedClass = cn(navItemsType.base, typeClasses);

    const isActive =
      !!pathname &&
      (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)));

    const activeTypeClassMap = {
      register: "bg-blue-primary-400",
      login: "bg-blue-primary-400",
      profile: "bg-dark-800 text-white",
      underline: "font-bold",
    };

    const activeClassForRender = isActive
      ? types.map((t) => activeTypeClassMap[t] || "").join(" ")
      : "";

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
        onNavigate();
        router.push("/login");
      }
    };

    if (types.includes("logout")) {
      return (
        <button
          type="button"
          aria-label={item.label}
          className={cn(combinedClass, "font-farro-medium text-center")}
          onClick={handleLogout}
        >
          {item.label}
        </button>
      );
    }

    return (
      <Link
        href={item.href}
        target={"_self"}
        aria-label={item.label}
        className={cn(combinedClass, activeClassForRender, "font-farro-medium")}
        onClick={onNavigate}
      >
        {types.includes("profile") ? (
          <>
            <CgProfile className={navItemsType.bellIcon} />
            <span>{item.label}</span>
          </>
        ) : types.includes("underline") ? (
          <span className={cn(navItemsType.underline)}>
            <span>{item.label}</span>
            <IoChevronForward className="w-[1rem] text-black sm:w-[1.5rem] lg:hidden" size={20} />
            {isActive && (
              <span className={cn("hidden lg:block", navItemsType.activeUnderline)}></span>
            )}
          </span>
        ) : (
          item.label
        )}
      </Link>
    );
  },
  (prev, next) => {
    const prevType = Array.isArray(prev.item.type)
      ? prev.item.type.join("|")
      : String(prev.item.type);
    const nextType = Array.isArray(next.item.type)
      ? next.item.type.join("|")
      : String(next.item.type);
    return (
      prev.item.href === next.item.href &&
      prevType === nextType &&
      prev.onNavigate === next.onNavigate
    );
  },
);

RenderNavItem.displayName = "RenderNavItem";
