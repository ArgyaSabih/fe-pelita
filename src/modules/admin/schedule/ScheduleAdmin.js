"use client";
import { FiSearch, FiPlus } from "react-icons/fi";
import HeaderAdmin from "./HeaderAdmin";
import TableScheduleAdmin from "./TableScheduleAdmin";
import PaginationAdmin from "@/components/admin/PaginationAdmin";
import ModalCreateSchedule from "@/components/admin/schedule/ModalCreateSchedule";
import ModalUpdateSchedule from "@/components/admin/schedule/ModalUpdateSchedule";
import ModalDeleteSchedule from "@/components/admin/schedule/ModalDeleteSchedule";
import { useScheduleManagement } from "@/utils/hooks/useScheduleManagement";
import { transformSchedulePayload } from "@/utils/admin/scheduleHelper";

export default function ScheduleAdmin() {
  const {
    // State
    query,
    setQuery,
    page,
    totalPages,
    items,
    user,
    sortBy,
    sortDir,

    // Modal States
    isModalOpen,
    isUpdateModalOpen,
    isDeleteModalOpen,
    selectedSchedule,

    // Handlers
    goTo,
    toggleSort,
    handleCreateSchedule,
    handleUpdateSchedule,
    handleConfirmDelete,
    handleEditClick,
    handleDeleteClick,
    openCreateModal,
    closeCreateModal,
    closeModalAndRefresh,
    setIsUpdateModalOpen,
    setIsDeleteModalOpen,
  } = useScheduleManagement(10);

  return (
    <div className="font-adlam-display-regular pb-6">
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
              className="w-[17rem] rounded-md border px-3 py-2 pr-8 text-lg"
            />
            <FiSearch className="absolute top-0 right-3 h-full w-[1.25rem] justify-center text-gray-400" />
          </div>

          <button
            onClick={openCreateModal}
            className="bg-dark-500 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-white"
          >
            <FiPlus />
            <span className="text-lg">Create</span>
          </button>
        </div>

        {/* Schedule Table */}
        <TableScheduleAdmin
          items={items}
          sortBy={sortBy}
          sortDir={sortDir}
          toggleSort={toggleSort}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center">
        <PaginationAdmin page={page} totalPages={totalPages} onPageChange={goTo} />
      </div>

      {/* Modals */}
      <ModalCreateSchedule
        isOpen={isModalOpen}
        onClose={closeCreateModal}
        onSave={(data) => handleCreateSchedule(data, transformSchedulePayload)}
      />

      <ModalUpdateSchedule
        isOpen={isUpdateModalOpen}
        onClose={() => closeModalAndRefresh(setIsUpdateModalOpen)}
        onUpdate={(data) => handleUpdateSchedule(data, transformSchedulePayload)}
        scheduleData={selectedSchedule}
      />

      <ModalDeleteSchedule
        isOpen={isDeleteModalOpen}
        onClose={() => closeModalAndRefresh(setIsDeleteModalOpen)}
        onDelete={handleConfirmDelete}
        scheduleData={selectedSchedule}
      />
    </div>
  );
}
