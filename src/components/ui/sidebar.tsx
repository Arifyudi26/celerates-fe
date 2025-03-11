"use client";

import React, { useState, useEffect } from "react";
import { Nav } from "./nav";
import { ChevronRight, LayoutDashboard, UsersRound } from "lucide-react";
import { Button } from "./button";
import { useWindowWidth } from "@react-hook/window-size";
import { Props } from "@/lib/types";

export default function Sidebar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = isMounted && onlyWidth < 768;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            variant="secondary"
            className="rounded-full p-2"
            onClick={toggleSidebar}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Users",
            href: "/users",
            icon: UsersRound,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
