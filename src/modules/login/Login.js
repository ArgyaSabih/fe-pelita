"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Impor router
import AuthCard from "@/components/authCard/AuthCard";
import { loginUser } from "@/utils/helpers/authHelper"; // 2. Impor helper API

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 3. State untuk error
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 4. Panggil helper login
      await loginUser(email, password);

      // 5. Jika sukses, token sudah disimpan. Arahkan ke homepage.
      router.push("/"); // Arahkan ke root (homepage/dashboard)
    } catch (err) {
      // 6. Tangani error khusus
      if (err.message === "PROFILE_INCOMPLETE") {
        // Ini "sukses" tapi profil belum lengkap.
        // Token sudah disimpan oleh helper. Paksa ke /register/complete.
        router.push("/register/complete");
      } else {
        // Ini error login asli (misal: password salah)
        setError(err.message);
        setLoading(false);
      }
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
          Selamat datang!
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

          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-farro-medium w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          {/* 7. Tampilkan pesan error jika ada */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading} // 8. Nonaktifkan tombol saat loading
            className="bg-pink-primary-200 font-farro-bold hover:bg-pink-primary-300 w-full rounded-lg py-3 text-gray-800 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Log In" : "Log In"}
          </button>
        </form>

        {/*
        <div className="mt-4 text-left">
          <Link
            href="/lupa-password"
            className="text-blue-primary-500 hover:text-blue-primary-600 text-sm font-semibold transition-colors hover:underline"
          >
            Lupa Password?
          </Link>
        </div> */}

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* 9. Tombol Google (WAJIB <a> tag, bukan <button>) */}
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
          <span className="font-farro-medium ml-3 text-gray-700">Log in with Google</span>
        </a>

        <p className="mt-8 text-left text-gray-600">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-primary-500 hover:text-blue-primary-600 font-semibold transition-colors hover:underline"
          >
            Daftar
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
