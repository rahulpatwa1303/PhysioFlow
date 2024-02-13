"use client";
import React from "react";
import NavigationButton from "./NavigationButton";
import {
  Home,
  BookOpen,
  PlusCircle,
  CalendarDays,
  CircleUser,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Patient from "@/assests/icon/patient";

function BottomNavBar() {
  const router = usePathname();
  const navigators = [
    {
      name: "home",
      route: "/home",
      icon: <Home />,
    },
    // {
    //   name: "performance",
    //   route: "/performance",
    //   icon: <BookOpen />,
    // },
    {
      name: "onboard new patient",
      route: "/patient/onboard",
      icon: <PlusCircle />,
    },
    {
      name: "calender",
      route: "/patient/list",
      icon: <Patient />,
    },
    // {
    //   name: "profile",
    //   route: "/profile",
    //   icon: <CircleUser />,
    // },
  ];
  return (
    <div className=" w-full  max-w-sm h-[58px] rounded-lg drop-shadow-lg bg-gradient-to-b from-gradientTop  to-gradientBottom">
      <div className="h-full w-full flex items-center gap-8 justify-center">
        {navigators.map((navs, index) => {
          const isActive = navs.route === router;
          return (
            <Link key={`${navs}-${index}`} href={navs.route}>
              <NavigationButton isActive={isActive} icon={navs.icon} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNavBar;
