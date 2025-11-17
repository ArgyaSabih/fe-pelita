"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/utils/helpers/authHelper";
import ParentProfileCard from "@/components/profile/ParentProfileCard";
import ChildProfileCard from "@/components/profile/ChildProfileCard";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
        if (userData.children && userData.children.length > 0) {
          setChild(userData.children[0]);
        }
      } catch (err) {
        localStorage.removeItem("accessToken");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
    } else {
      fetchProfile();
    }
  }, [router]);

  const handleParentUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleChildUpdate = (updatedChild) => {
    setChild(updatedChild);
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Memuat profil...</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-24 md:p-8 md:pt-32">
      <div>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Tampilkan Kartu Profil Orang Tua */}
          <ParentProfileCard user={user} onProfileUpdate={handleParentUpdate} onError={setError} />

          {/* Tampilkan Kartu Profil Anak */}
          <ChildProfileCard child={child} onChildUpdate={handleChildUpdate} onError={setError} />
        </div>
      </div>
    </div>
  );
}
