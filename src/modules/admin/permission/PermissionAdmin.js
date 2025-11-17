"use client";
import { FiSearch } from "react-icons/fi";
import HeaderAdmin from "./HeaderAdmin";
import PermissionCardAdmin from "@/components/admin/permission/PermissionCardAdmin";
import PaginationAdmin from "@/components/admin/PaginationAdmin";
import ModalApprovePermission from "@/components/admin/permission/ModalApprovePermission";
import ModalRejectPermission from "@/components/admin/permission/ModalRejectPermission";
import { usePermissionManagementAdmin } from "@/utils/hooks/usePermissionManagementAdmin";

export default function PermissionAdmin() {
  const {
    // State
    query,
    setQuery,
    page,
    totalPages,
    items,
    user,

    // Modal States
    isApproveModalOpen,
    isRejectModalOpen,
    selectedPermission,

    // Handlers
    goTo,
    handleApprove,
    handleReject,
    handleApproveClick,
    handleRejectClick,
    closeModalAndRefresh,
    setIsApproveModalOpen,
    setIsRejectModalOpen,
  } = usePermissionManagementAdmin(5);

  return (
    <div className="font-adlam-display-regular min-h-screen bg-gray-50 pb-6">
      {/* Header Section */}
      <HeaderAdmin username={user.username} email={user.email} />

      {/* Main Content */}
      <div className="px-8">
        {/* Search Bar */}
        <div className="mb-5 flex w-full items-center justify-between">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-68 rounded-md border px-3 py-2 pr-8 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <FiSearch className="absolute top-0 right-3 h-full w-5 justify-center text-gray-400" />
          </div>
        </div>

        {/* Permission Letters Grid */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-16">
              <p className="text-lg text-gray-500">Tidak ada surat izin yang ditemukan</p>
            </div>
          ) : (
            items.map((permission, index) => {
              const key = permission._id || permission.id;
              return (
                <PermissionCardAdmin
                  key={key}
                  permission={permission}
                  index={(page - 1) * 5 + index}
                  onApproveClick={handleApproveClick}
                  onRejectClick={handleRejectClick}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center">
        <PaginationAdmin page={page} totalPages={totalPages} onPageChange={goTo} />
      </div>

      {/* Modals */}
      <ModalApprovePermission
        isOpen={isApproveModalOpen}
        onClose={() => closeModalAndRefresh(setIsApproveModalOpen)}
        onApprove={handleApprove}
        permissionData={selectedPermission}
      />

      <ModalRejectPermission
        isOpen={isRejectModalOpen}
        onClose={() => closeModalAndRefresh(setIsRejectModalOpen)}
        onReject={handleReject}
        permissionData={selectedPermission}
      />
    </div>
  );
}
