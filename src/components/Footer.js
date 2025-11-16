export default function Footer() {
  return (
    <footer className="w-full bg-[#112456] text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              PELITA - Pendamping Teliti Anak TK
            </h3>
            <p className="text-sm leading-relaxed">
              Mendukung kolaborasi antara orang tua dan guru untuk menciptakan lingkungan
              belajar terbaik bagi anak.
            </p>
          </div>


          {/* Quick Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Menu Cepat</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/schedule" className="hover:underline">Schedule</a></li>
              <li><a href="/feedback" className="hover:underline">Feedback</a></li>
              <li><a href="/announcement" className="hover:underline">Announcement</a></li>
              <li><a href="/permission" className="hover:underline">Permission</a></li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Kontak</h3>
            <ul className="space-y-1 text-sm">
              <li>📞 +62 812-3456-7890</li>
              <li>📧 support@pelita.app</li>
              <li>📍 Yogyakarta, Indonesia</li>
            </ul>
          </div>


        </div>


        {/* Footer bottom */}
        <div className="text-center text-xs text-gray-300 mt-10">
          © 2025 PELITA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


