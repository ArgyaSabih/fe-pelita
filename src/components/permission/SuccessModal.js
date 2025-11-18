"use client";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function SuccessModal({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleOK = () => {
    router.push("/permission");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border-l-4 border-l-green-500 bg-white p-6 shadow-lg">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Success Message */}
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Surat Izin berhasil dibuat!
          </h2>
          <p className="mb-6 text-gray-700">
            Kembali ke tampilan awal
          </p>

          {/* OK Button */}
          <button
            onClick={handleOK}
            className="w-full rounded-md bg-green-500 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

