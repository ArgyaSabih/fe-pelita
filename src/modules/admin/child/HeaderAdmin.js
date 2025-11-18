"use client";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbMoodKid } from "react-icons/tb";

export default function HeaderAdmin({ username, email }) {
  return (
    <div className="mb-8 flex items-center justify-between px-8 pt-6">
      <div className="flex items-center gap-4">
        <div className="bg-dark-500 rounded-md p-3 text-white">
          <TbMoodKid className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-semibold">Child</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold">{username || "Admin"}</p>
          <p className="text-sm text-gray-500">{email || "admin@pelita.com"}</p>
        </div>
        <FaRegCircleUser className="h-12 w-12 text-gray-600" />
      </div>
    </div>
  );
}

