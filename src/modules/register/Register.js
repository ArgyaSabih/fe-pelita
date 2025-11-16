"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/authCard/AuthCard";
import { registerUser } from "@/utils/helpers/authHelper";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== rePassword) {
      setError("Password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      // Helper Anda sudah benar (menerima email & password)
      await registerUser(email, password);

      // Jika sukses, token disimpan, arahkan ke 'lengkapi profil'
      router.push("/register/complete");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="font-farro-medium w-full max-w-sm">
        {/* Logo Mobile */}
        <div className="mb-8 flex justify-center md:hidden">
          <Image
            src="/assets/login/logo-teks-bawah.png"
            alt="Logo PELITA"
            width={150}
            height={150}
            priority
          />
        </div>

        <h1 className="font-adlam-display-regular mb-8 text-center text-4xl font-bold text-gray-900 md:text-left">
          Daftar
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-farro-medium w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
              required
            />
          </div>

          {/* --- Input Password BARU --- */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-farro-medium w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              required
              minLength={6}
            />
          </div>

          {/* --- Input Ulangi Password BARU --- */}
          <div className="mb-6">
            <input
              type="password"
              id="rePassword"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="font-farro-medium w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Re-enter Password"
              required
              minLength={6}
            />
          </div>

          {/* Tampilkan pesan error jika ada */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Ubah teks tombol dari "Next" menjadi "Daftar" */}
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-primary-200 font-farro-bold hover:bg-pink-primary-300 w-full rounded-lg py-3 text-gray-800 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        {/* Pemisah "OR" */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Tombol Google (Link <a>) */}
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
          className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white py-3 transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
        >
          <Image
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
          <span className="font-farro-medium ml-3 text-gray-700">Sign up with Google</span>
        </a>

        {/* Link ke Halaman Masuk */}
        <p className="mt-8 text-left text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-blue-primary-500 hover:text-blue-primary-600 font-semibold transition-colors hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
