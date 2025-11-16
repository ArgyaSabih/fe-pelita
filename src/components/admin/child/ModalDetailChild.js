"use client";
import { IoClose } from "react-icons/io5";

export default function ModalDetailChild({ isOpen, onClose, childData }) {
  if (!isOpen || !childData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getParentNames = () => {
    if (!childData.parents || childData.parents.length === 0) {
      return "-";
    }
    return childData.parents.map((parent) => parent.name || parent.email).join(", ");
  };

  const getMedicalRecords = () => {
    if (!childData.medicalRecord || childData.medicalRecord.length === 0) {
      return "-";
    }
    if (Array.isArray(childData.medicalRecord)) {
      return childData.medicalRecord.join(", ");
    }
    return childData.medicalRecord;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="border-[#9EB84A] relative w-full max-w-lg rounded-lg border-r-4 border-b-4 bg-white p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <h2 className="mb-6 text-2xl font-semibold">Detail Anak</h2>

        {/* Detail Content */}
        <div className="space-y-4">
          {/* Nama */}
          <div className="flex">
            <div className="w-40 font-medium text-gray-700">Nama</div>
            <div className="flex-1">: {childData.name || "-"}</div>
          </div>

          {/* Orang Tua */}
          <div className="flex">
            <div className="w-40 font-medium text-gray-700">Orang Tua</div>
            <div className="flex-1">: {getParentNames()}</div>
          </div>

          {/* Tanggal Lahir */}
          <div className="flex">
            <div className="w-40 font-medium text-gray-700">Tanggal Lahir</div>
            <div className="flex-1">: {formatDate(childData.dateOfBirth)}</div>
          </div>

          {/* Kelas */}
          <div className="flex">
            <div className="w-40 font-medium text-gray-700">Kelas</div>
            <div className="flex-1">: {childData.class || "-"}</div>
          </div>

          {/* Medical Record */}
          <div className="flex">
            <div className="w-40 font-medium text-gray-700">Medical Record</div>
            <div className="flex-1">: {getMedicalRecords()}</div>
          </div>

          {/* Notes */}
          <div className="flex">
            <div className="w-40 font-medium text-gray-700">Notes</div>
            <div className="flex-1">: {childData.notes || "-"}</div>
          </div>

          {/* Invitation Code */}
          <div className="flex">
            <div className="w-40 font-medium text-gray-700">Invitation Code</div>
            <div className="flex-1 font-semibold">: {childData.invitationCode || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

