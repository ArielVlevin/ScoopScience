import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  CircuitBoardIcon,
  GaugeIcon,
  MenuIcon,
  Package2Icon,
  TrelloIcon,
  UsersIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

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
          className="flex-1 overflow-auto px-2 py-4 bg-muted"
          style={{
            width: isSidebarVisible ? sidebarWidth : 0,
          }}
        >
          <div className="flex h-14 items-center justify-between border-b px-4  ">
            <Link to="#" className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span>Acme Inc</span>
            </Link>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>

          <div className="w-full">
            <Accordion type="single" collapsible className="m-4">
              <AccordionItem value="projects" className="">
                <AccordionTrigger className="text-base bg-foreground text-white rounded-md h-10 ">
                  <TrelloIcon className="size-4 mr-2 ml-2 " />
                  Category
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Link
                      to="#"
                      className="flex items-center gap-2 px-2.5 text-muted-foreground hover:text-foreground mt-2"
                    >
                      <CircuitBoardIcon className="size-4 mr-2 ml-2 " />
                      Gelato
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center gap-2 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <CircuitBoardIcon className="size-4 mr-2 ml-2 " />
                      Ice cream
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center gap-2 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <CircuitBoardIcon className="size-4 mr-2 ml-2 " />
                      sorbet
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="teams">
                <AccordionTrigger className="text-base bg-foreground text-white rounded-md h-10 ">
                  <UsersIcon className="size-4 mr-2 ml-2 " />
                  Teams
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2"></div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="status">
                <AccordionTrigger className="text-base bg-foreground text-white rounded-md h-10 ">
                  <GaugeIcon className="size-4 mr-2 ml-2 " />
                  Status
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2"></div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </nav>
        <div
          className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-gray-300/40 hover:bg-gray-300/60 flex items-center justify-center"
          onMouseDown={handleMouseDown}
        />
      </div>
      <div
        onClick={toggleSidebar}
        className={`cursor-pointer fixed top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 hover:scale-110 hover:bg-muted/50 hover:text-foreground
          
        }
        `}
        style={{
          left: isSidebarVisible ? `${sidebarWidth - 14}px` : "-2px",
        }}
      >
        {isSidebarVisible ? (
          <ChevronLeftCircleIcon className="size-7 bg-white/80 rounded-full text-gray-600 hover:scale-110" />
        ) : (
          <ChevronRightCircleIcon className="size-7 bg-white/80 rounded-full text-gray-600 hover:scale-110" />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
