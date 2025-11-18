"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Homepage from "@/modules/homepage/Homepage";
import UserOverview from "@/modules/overview/UserOverview";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show UserOverview if logged in, otherwise show landing page
  return isLoggedIn ? <UserOverview /> : <Homepage />;
}
