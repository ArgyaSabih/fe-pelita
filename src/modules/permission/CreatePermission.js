"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPermissionLetter } from "@/utils/permission/permissionHelper";
import { FiSend, FiUpload, FiArrowLeft } from "react-icons/fi";
import SuccessModal from "@/components/permission/SuccessModal";

export default function CreatePermission() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [supportingDocument, setSupportingDocument] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        studentName,
        reason,
        startDate,
        endDate,
      };

      // Add supportingDocument only if provided
      if (supportingDocument.trim()) {
        payload.supportingDocument = supportingDocument.trim();
      }

      await createPermissionLetter(payload);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to create permission letter:", error);

      // Get detailed error message
      let errorMessage = "Gagal membuat surat izin. Silakan coba lagi.";

      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
        console.error("Error response:", error.response.data);
        console.error("Status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response received
        errorMessage =
          "Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:8000";
        console.error("No response received:", error.request);
      } else {
        // Error setting up the request
        errorMessage = error.message || errorMessage;
        console.error("Error setting up request:", error.message);
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/permission")}
          className="transition-color mb-6 flex cursor-pointer items-center gap-2 rounded-lg p-2 px-3 text-gray-700 transition-all hover:bg-gray-200 hover:text-gray-900"
        >
          <FiArrowLeft className="h-5 w-5" />
          <span className="font-medium">Kembali</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-4xl">Surat Izin Siswa</h1>
          <p className="text-lg text-gray-700">
            Ajukan surat izin siswa dan lihat proses pengajuannya di sini
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-gray-200 bg-[#ECF7FC] p-8 shadow-sm">
          {/* Form Title */}
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
            Ajukan Surat Izin Baru
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Student Name */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nama Lengkap Siswa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
                    required
                    placeholder="Masukkan nama lengkap siswa"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Alasan Izin <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="h-32 w-full resize-none rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
                    required
                    placeholder="Masukkan alasan izin"
                  ></textarea>
                </div>

                {/* Start Date */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Tanggal Mulai <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white p-3 pr-10 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Tanggal Selesai <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || undefined}
                      className="w-full rounded-md border border-gray-300 bg-white p-3 pr-10 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Supporting Document */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Dokumen Pendukung (Opsional)
                  </label>
                  <div className="relative">
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white p-4">
                      <div className="w-full space-y-3 text-center">
                        <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Masukkan URL dokumen</p>
                        <input
                          type="url"
                          value={supportingDocument}
                          onChange={(e) => setSupportingDocument(e.target.value)}
                          className="w-full max-w-xs rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
                          placeholder="https://example.com/dokumen.pdf"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Field Note */}
            <p className="mt-4 text-xs text-gray-600">Kolom dengan tanda (*) wajib diisi.</p>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex cursor-pointer items-center gap-2 rounded-md bg-[#112456] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0d1a3f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSend className="h-5 w-5" />
                {isSubmitting ? "Mengajukan..." : "Ajukan"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
}
