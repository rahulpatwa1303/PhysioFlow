"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

function Header() {
  const router = usePathname();

  const headTitle =
    router === "/home"
      ? "Todays Visit"
      : router === "/patient/onboard"
      ? "Onboard New Patient"
      : "";

  return (
    <div className="flex justify-between py-4 px-6 font-semibold text-customFontColor font-[Lato] text-lg items-center">
      <div></div>
      <div>{headTitle}</div>
      <div>{router === "/home" && <Bell size={20} />}</div>
    </div>
  );
}

export default Header;
