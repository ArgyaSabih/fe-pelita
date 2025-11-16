"use client";
import { FiSearch, FiPlus } from "react-icons/fi";
import HeaderAdmin from "./HeaderAdmin";
import AnnouncementCard from "@/components/admin/announcement/AnnouncementCard";
import PaginationAdmin from "@/components/admin/PaginationAdmin";
import ModalCreateAnnouncement from "@/components/admin/announcement/ModalCreateAnnouncement";
import ModalUpdateAnnouncement from "@/components/admin/announcement/ModalUpdateAnnouncement";
import ModalDeleteAnnouncement from "@/components/admin/announcement/ModalDeleteAnnouncement";
import { useAnnouncementManagement } from "@/utils/hooks/useAnnouncementManagement";

export default function AnnoucementAdmin() {
  const {
    // State
    query,
    setQuery,
    page,
    totalPages,
    items,
    user,

    // Modal States
    isModalOpen,
    isUpdateModalOpen,
    isDeleteModalOpen,
    selectedAnnouncement,

    // Handlers
    goTo,
    handleCreateAnnouncement,
    handleUpdateAnnouncement,
    handleConfirmDelete,
    handleEditClick,
    handleDeleteClick,
    openCreateModal,
    closeCreateModal,
    closeModalAndRefresh,
    setIsUpdateModalOpen,
    setIsDeleteModalOpen,
  } = useAnnouncementManagement(10);

  return (
    <div className="font-adlam-display-regular min-h-screen bg-gray-50 pb-6">
      {/* Header Section */}
      <HeaderAdmin username={user.username} email={user.email} />

      {/* Main Content */}
      <div className="px-8">
        {/* Search & Create Bar */}
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

          <button
            onClick={openCreateModal}
            className="bg-dark-500 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-white hover:bg-dark-600 transition-colors"
          >
            <FiPlus />
            <span className="text-lg">Create</span>
          </button>
        </div>

        {/* Announcements Grid */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-16">
              <p className="text-lg text-gray-500">Tidak ada pengumuman yang ditemukan</p>
            </div>
          ) : (
            items.map((announcement) => {
              const key = announcement._id || announcement.id;
              return (
                <AnnouncementCard
                  key={key}
                  announcement={announcement}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
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
      <ModalCreateAnnouncement
        isOpen={isModalOpen}
        onClose={closeCreateModal}
        onSave={handleCreateAnnouncement}
      />

      <ModalUpdateAnnouncement
        isOpen={isUpdateModalOpen}
        onClose={() => closeModalAndRefresh(setIsUpdateModalOpen)}
        onUpdate={handleUpdateAnnouncement}
        announcementData={selectedAnnouncement}
      />

      <ModalDeleteAnnouncement
        isOpen={isDeleteModalOpen}
        onClose={() => closeModalAndRefresh(setIsDeleteModalOpen)}
        onDelete={handleConfirmDelete}
        announcementData={selectedAnnouncement}
      />
    </div>
  );
}

