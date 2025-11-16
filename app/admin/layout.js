import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin - PELITA",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
