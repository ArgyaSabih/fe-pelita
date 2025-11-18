"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Homepage from "@/modules/homepage/Homepage";
import UserOverview from "@/modules/overview/UserOverview";
import fetchAPI from "@/utils/api/fetchAPI";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        // Fetch user profile to check role
        const response = await fetchAPI.get("/users/profile");
        const user = response.data.data.user;

        // If admin, redirect to /admin
        if (user.role === "admin") {
          router.push("/admin");
          return;
        }

        // Otherwise, show user overview
        setIsLoggedIn(true);
        setLoading(false);
      } catch (error) {
        console.error("Error checking user role:", error);
        // If error (e.g., token expired), clear token and show landing page
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

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
