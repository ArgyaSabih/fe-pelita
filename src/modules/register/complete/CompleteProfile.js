"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { completeProfile, completeGoogleRegistration } from "@/utils/helpers/authHelper";

export default function CompleteProfile() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <CompleteProfileForm />
    </Suspense>
  );
}

function CompleteProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [childCode, setChildCode] = useState("");
  const [token, setToken] = useState(null);
  const [isGoogleFlow, setIsGoogleFlow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authToken = searchParams.get("token");
    const tempToken = searchParams.get("tempToken");

    if (authToken) {
      setToken(authToken);
      setIsGoogleFlow(false);
      localStorage.setItem("accessToken", authToken);
    } else if (tempToken) {
      setToken(tempToken);
      setIsGoogleFlow(true);
    } else {
      const existingToken = localStorage.getItem("accessToken");
      if (existingToken) {
        setToken(existingToken);
        setIsGoogleFlow(false);
      } else {
        setError("Sesi tidak valid. Silakan login atau daftar ulang.");
        router.push("/login");
      }
    }
  }, [searchParams, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isGoogleFlow) {
        const payload = { tempToken: token, name, phoneNumber, address, childCode };
        await completeGoogleRegistration(payload);
      } else {
        const payload = { name, phoneNumber, address, childCode };
        await completeProfile(payload);
      }
      router.push("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    // Latar belakang abu-abu
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Kartu putih */}
      <div className="font-farro-medium w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg md:p-10">
        <h1 className="font-adlam-display-regular mb-4 text-left text-4xl font-bold text-gray-900">
          Lengkapi Profil Anda
        </h1>
        <p className="mb-8 text-left text-gray-600">
          Satu langkah terakhir untuk mulai mengawasi anak Anda.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Container Flex*/}
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* --- KOLOM KIRI: PROFIL ORANG TUA --- */}
            <div className="flex-1">
              <h2 className="font-farro-bold mb-4 text-xl text-gray-800">Profil Anda</h2>
              {/* Nama Lengkap */}
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-farro-medium w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Nama Lengkap Anda"
                  required
                />
              </div>
              {/* Nomor Telepon */}
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nomor Handphone
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="font-farro-medium w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. 081234567890"
                  required
                />
              </div>
              {/* Alamat */}
              <div className="mb-4">
                <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
                  Alamat
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="font-farro-medium w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Alamat Lengkap Anda"
                  required
                  rows={3}
                />
              </div>
            </div>

            {/* Pemisah Vertikal (Hanya tampil di large screen) */}
            <div className="hidden lg:block lg:border-l lg:border-gray-200"></div>

            {/* --- KOLOM KANAN: KODE ANAK & SUBMIT --- */}
            <div className="mt-6 flex flex-1 flex-col lg:mt-0">
              <div className="flex-grow">
                <h2 className="font-farro-bold mb-4 text-xl text-gray-800">Hubungkan Anak</h2>
                {/* Kode Undangan Anak */}
                <div className="mb-6">
                  <label
                    htmlFor="childCode"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Kode Undangan Anak
                  </label>
                  <input
                    type="text"
                    id="childCode"
                    value={childCode}
                    onChange={(e) => setChildCode(e.target.value)}
                    className="font-farro-medium w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Masukkan kode unik anak Anda"
                    required
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Kode ini diberikan oleh pihak sekolah. Hubungi pihak sekolah jika Anda belum
                    menerimanya.
                  </p>
                </div>
              </div>

              {/* Container untuk error dan tombol (didorong ke bawah) */}
              <div>
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !token}
                  className="bg-pink-primary-200 font-farro-bold hover:bg-pink-primary-300 mt-4 ml-auto block rounded-lg px-6 py-3 text-gray-900 transition duration-300 disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : "Finish"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
