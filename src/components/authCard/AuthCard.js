//src/components/authCard/authCard.js

import Image from "next/image";

/*
  Ini adalah komponen "pembungkus" baru Anda.
  Ia menerima 'children', yang nantinya akan menjadi
  komponen <LoginForm /> atau <RegisterForm /> Anda.
*/
export default function AuthCard({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Kolom Kiri: Logo */}
        <div className="hidden flex-1 items-center justify-center bg-white p-12 md:flex">
          <div className="text-center">
            {/* Anda bisa membuat path logo ini dinamis jika perlu, 
              tapi untuk sekarang kita gunakan logo utama.
            */}
            <Image
              src="/assets/login/logo-teks-bawah.png"
              alt="Logo PELITA"
              width={300}
              height={300}
              priority
            />
          </div>
        </div>

        {/* Kolom Kanan: Form (Anak-anak) */}
        <div className="flex flex-1 items-center justify-center p-8">
          {/* {children} adalah tempat form Anda akan dirender */}
          {children}
        </div>
      </div>
    </div>
  );
}
