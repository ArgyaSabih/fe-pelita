"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { getNavItems, RenderNavItem } from "@/components/navbar/NavHelper";
import { usePathname } from "next/navigation";
import HamburgerButton from "./HamburgerButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const pathname = usePathname();
  const closeMenu = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("accessToken");
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);
    setNavItems(getNavItems(loggedIn));
  }, [pathname]); // Re-check on route change

  // Hide Navbar for included routes
  const isAuthRoute = pathname?.includes("/login") || pathname?.includes("/register");

  if (pathname?.includes("/admin") || isAuthRoute) {
    return null;
  }

  return (
    <div className="text-neutral-1000 flex w-full justify-center">
      <nav
        className={cn([
          "fixed top-0 left-0 z-[79] w-full rounded-b-[1rem] bg-white px-5 py-5 shadow-sm drop-shadow-lg transition-all duration-400 ease-in-out 2xl:px-8 2xl:py-6",
          isScrolled && "transform-origin-top top-6 scale-[0.96] rounded-[1rem] !py-5",
          isScrolled && isMenuOpen && "rounded-b-none max-md:py-5",
        ])}
      >
        <div className="mx-auto flex w-full items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              onNavigate={() => setIsMenuOpen(false)}
              className="relative flex h-full items-center space-x-2"
            >
              <div className="relative h-full w-[10rem]">
                <Image
                  src="/assets/favicon/logo-desktop.webp"
                  alt="Logo"
                  width={1000}
                  height={1000}
                  className="scale-110"
                />
              </div>
            </Link>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center">
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navItems.map((item) => (
                <div key={item.href} className="px-1">
                  <RenderNavItem item={item} onNavigate={closeMenu} />
                </div>
              ))}
            </div>

            {/* Mobile dropdown */}
            <div
              className={cn(
                "absolute left-0 w-full space-y-4 rounded-b-[1rem] bg-white px-4 py-7 transition-all duration-400 ease-in-out lg:hidden lg:px-0",
                isMenuOpen
                  ? "visible top-full -translate-y-4 opacity-100"
                  : "invisible top-[70%] rounded-b-[1rem] opacity-0",
              )}
            >
              {navItems.map((item) => (
                <div key={item.href} className="flex w-full justify-center px-2">
                  <RenderNavItem item={item} onNavigate={closeMenu} />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center pr-2 lg:hidden">
              <HamburgerButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
