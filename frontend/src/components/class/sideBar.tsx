import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MenuIcon,
  Package2Icon,
  SettingsIcon,
} from "lucide-react";

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default width is 256px (w-64)
  const [isResizing, setIsResizing] = useState(false);

  const minWidth = 200;
  const maxWidth = 400;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (event: MouseEvent) => {
      setIsResizing(true);
      const newWidth = startWidth + event.clientX - startX;
      setSidebarWidth(Math.min(Math.max(newWidth, minWidth), maxWidth)); // Prevent negative width
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex">
      <div
        className={`relative flex flex-col border-r bg-background ${
          !isResizing && "transition-all duration-300"
        }`}
        style={{
          overflow: isSidebarVisible ? "visible" : "hidden",
        }}
      >
        <nav
          className="flex-1 overflow-auto px-2 py-4"
          style={{
            width: isSidebarVisible ? sidebarWidth : 0,
          }}
        >
          <div className="flex h-14 items-center justify-between border-b px-4">
            <Link to="#" className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span>Acme Inc</span>
            </Link>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
          <div className="grid gap-2">
            <Link
              to="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              <LayoutDashboardIcon className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              <CalendarIcon className="h-5 w-5" />
              Calendar
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              <SettingsIcon className="h-5 w-5" />
              Settings
            </Link>
          </div>
        </nav>
        <div
          className="absolute top-0 right-0 h-full w-4 cursor-col-resize bg-muted/50 hover:bg-muted flex items-center justify-center"
          onMouseDown={handleMouseDown}
        />
      </div>
      <div
        onClick={toggleSidebar}
        className={`cursor-pointer fixed top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 
        `}
        style={{
          left: isSidebarVisible ? sidebarWidth : "-8px",
        }}
      >
        {isSidebarVisible ? (
          <ChevronLeftCircleIcon className="h-8 w-8" />
        ) : (
          <ChevronRightCircleIcon className="h-8 w-8" />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
