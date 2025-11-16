"use client";
import { CgProfile } from "react-icons/cg";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";

export default function HeaderAdmin({ username, email, title, icon }) {

  const Icon = icon === "feedback" 
    ? BiMessageDetail 
    : HiOutlineSpeakerphone;

  return (
    <div className="mb-8 flex items-center justify-between bg-white px-8 py-6 shadow-md">
      <div className="flex items-center gap-3">
        <Icon className="h-full w-12" />
        <span className="text-3xl font-semibold">{title}</span>
      </div>

      <div className="flex gap-4">
        <CgProfile className="h-full w-12 text-gray-700" />
        <div className="flex flex-col">
          <span className="text-[1.1rem] font-semibold">{username}</span>
          <span className="text-[0.9rem] text-gray-600">{email}</span>
        </div>
      </div>
    </div>
  );
}
