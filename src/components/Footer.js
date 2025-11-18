"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  // Hide Footer for included routes
  const isAuthRoute = pathname?.includes("/login") || pathname?.includes("/register");

  if (pathname?.includes("/admin") || isAuthRoute) {
    return null;
  }

  return (
    <footer className="relative w-full bg-[#112456] py-10 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">PELITA - Pendamping Teliti Anak TK</h3>
            <p className="text-sm leading-relaxed">
              Mendukung kolaborasi antara orang tua dan guru untuk menciptakan lingkungan belajar
              terbaik bagi anak.
            </p>
          </div>

          {/* Quick Menu */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Menu Cepat</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/schedule" className="hover:underline">
                  Schedule
                </a>
              </li>
              <li>
                <a href="/feedback" className="hover:underline">
                  Feedback
                </a>
              </li>
              <li>
                <a href="/announcement" className="hover:underline">
                  Announcement
                </a>
              </li>
              <li>
                <a href="/permission" className="hover:underline">
                  Permission
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Kontak</h3>
            <ul className="space-y-1 text-sm">
              <li>📞 +62 812-3456-7890</li>
              <li>📧 support@pelita.app</li>
              <li>📍 Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-10 text-center text-xs text-gray-300">
          © 2025 PELITA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
