"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchAPI from "@/utils/api/fetchAPI";

export default function AdminProtection({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/login");
          return;
        }

        // Fetch user profile to check role
        const response = await fetchAPI.get("/users/profile");
        const user = response.data.data.user;

        if (user.role !== "admin") {
          // Not admin, redirect to homepage
          router.push("/");
          return;
        }

        // User is admin, allow access
        setIsAuthorized(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        // If error (token invalid, etc), redirect to login
        localStorage.removeItem("accessToken");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading spinner while checking authorization
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Memeriksa akses...</p>
        </div>
      </div>
    );
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;
}
