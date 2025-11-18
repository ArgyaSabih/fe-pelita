import Sidebar from "@/components/admin/Sidebar";
import AdminProtection from "@/components/admin/AdminProtection";

export const metadata = {
  title: "Admin - PELITA",
};

export default function AdminLayout({ children }) {
  return (
    <AdminProtection>
      <div className="min-h-screen bg-white text-black">
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </AdminProtection>
  );
}
