"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePermissionManagement } from "@/utils/hooks/usePermissionManagement";
import { FiPlus } from "react-icons/fi";
import PermissionCard from "@/components/permission/PermissionCard";
import ModalUpdatePermission from "@/components/permission/ModalUpdatePermission";
import ModalDeletePermission from "@/components/permission/ModalDeletePermission";

export default function Permission() {
  const { items, loading, error, handleUpdate, handleDelete } = usePermissionManagement();

  // Modal states
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const openUpdateModal = (permission) => {
    setSelectedPermission(permission);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (permission) => {
    setSelectedPermission(permission);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="font-adlam-display-regular relative min-h-screen w-full bg-white pt-32 pb-20">

      {/* Dino image */}
      <div className="pointer-events-none absolute bottom-[-5.5rem] left-[-2.5rem] h-[18rem] w-[18rem] md:h-[20rem] md:w-[20rem]">
        <Image
          src="/assets/schedule/dino-lucu.webp"
          fill
          alt="dino aset"
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header With Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-4xl">
              Surat Izin Siswa
            </h1>
            <p className="text-lg text-gray-700">
              Ajukan surat izin siswa dan lihat proses pengajuannya di sini
            </p>
          </div>

          <Link
            href="/permission/create"
            className="flex items-center gap-3 bg-[#112456] text-white 
                      px-5 py-3 rounded-xl hover:bg-[#0d1a3f] transition shadow-sm"
          >
            <FiPlus className="text-2xl text-white" />
            <div className="flex flex-col leading-tight text-left">
              <span className="font-semibold text-base">Tambah Surat Izin</span>
            </div>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
            <p className="text-lg text-red-700">{error}</p>
          </div>
        )}

        {/* Permission Letters List */}
        {!loading && !error && (
          <div className="space-y-6">
            {items.length === 0 ? (
              <div className="rounded-lg border bg-gray-50 p-12 text-center">
                <p className="text-xl text-gray-500">Belum ada surat izin</p>
              </div>
            ) : (
              items.map((permission, idx) => (
                <PermissionCard
                  key={permission.id || permission._id || idx}
                  permission={permission}
                  index={idx}
                  onEditClick={openUpdateModal}
                  onDeleteClick={openDeleteModal}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <ModalUpdatePermission
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        permissionData={selectedPermission}
        onUpdate={async (id, updatedData) => {
          await handleUpdate(id, updatedData);
          setIsUpdateModalOpen(false);
        }}
      />

      <ModalDeletePermission
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        permissionData={selectedPermission}
        onDelete={async (permission) => {
          await handleDelete(permission.id || permission._id);
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
}

