"use client";
import { CgProfile } from "react-icons/cg";
import { AiOutlineCalendar } from "react-icons/ai";

export default function HeaderAdmin({ username, email }) {
  return (
    <div className="mb-8 flex items-center justify-between px-8 py-6 shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <AiOutlineCalendar className="h-full w-[3rem]" />
        </div>
        <span className="text-3xl font-semibold">Schedule</span>
      </div>
      <div className="flex gap-4">
        <CgProfile className="h-full w-[3rem] text-gray-700" />
        <div className="flex flex-col">
          <span className="text-[1.1rem] font-semibold">{username}</span>
          <span className="text-[0.9rem] text-gray-600">{email}</span>
        </div>
      </div>
    </div>
  );
}
