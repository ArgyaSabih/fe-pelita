"use client";
import { FiSearch, FiPlus } from "react-icons/fi";
import HeaderAdmin from "./HeaderAdmin";
import TableChildAdmin from "./TableChildAdmin";
import PaginationAdmin from "@/components/admin/PaginationAdmin";
import ModalCreateChild from "@/components/admin/child/ModalCreateChild";
import ModalUpdateChild from "@/components/admin/child/ModalUpdateChild";
import ModalDeleteChild from "@/components/admin/child/ModalDeleteChild";
import ModalDetailChild from "@/components/admin/child/ModalDetailChild";
import { useChildManagement } from "@/utils/hooks/useChildManagement";
import { transformChildPayload } from "@/utils/admin/childHelper";

export default function ChildAdmin() {
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
    isDetailModalOpen,
    selectedChild,

    // Handlers
    goTo,
    toggleSort,
    handleCreateChild,
    handleUpdateChild,
    handleConfirmDelete,
    handleDetailClick,
    handleEditClick,
    handleDeleteClick,
    openCreateModal,
    closeCreateModal,
    closeModalAndRefresh,
    setIsUpdateModalOpen,
    setIsDeleteModalOpen,
    setIsDetailModalOpen,
  } = useChildManagement(10);

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
              className="w-68 rounded-md border px-3 py-2 pr-8 text-lg"
            />
            <FiSearch className="absolute top-0 right-3 h-full w-5 justify-center text-gray-400" />
          </div>

          <button
            onClick={openCreateModal}
            className="bg-dark-500 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-white"
          >
            <FiPlus />
            <span className="text-lg">Create</span>
          </button>
        </div>

        {/* Child Table */}
        <TableChildAdmin
          items={items}
          page={page}
          sortBy={sortBy}
          sortDir={sortDir}
          toggleSort={toggleSort}
          onDetailClick={handleDetailClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center">
        <PaginationAdmin page={page} totalPages={totalPages} onPageChange={goTo} />
      </div>

      {/* Modals */}
      <ModalCreateChild
        isOpen={isModalOpen}
        onClose={closeCreateModal}
        onSave={(data) => handleCreateChild(data, transformChildPayload)}
      />

      <ModalUpdateChild
        isOpen={isUpdateModalOpen}
        onClose={() => closeModalAndRefresh(setIsUpdateModalOpen)}
        onUpdate={(data) => handleUpdateChild(data, transformChildPayload)}
        childData={selectedChild}
      />

      <ModalDeleteChild
        isOpen={isDeleteModalOpen}
        onClose={() => closeModalAndRefresh(setIsDeleteModalOpen)}
        onDelete={handleConfirmDelete}
        childData={selectedChild}
      />

      <ModalDetailChild
        isOpen={isDetailModalOpen}
        onClose={() => closeModalAndRefresh(setIsDetailModalOpen)}
        childData={selectedChild}
      />
    </div>
  );
}

