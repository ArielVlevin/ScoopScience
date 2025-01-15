import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IceCreamConeIcon } from "@/components/icons/icon";

import "./navbarBtn.css";
import UserDropDownMenu from "../components/navbar/userDropDownMenu";
import { ModeToggle } from "@/components/navbar/modeToggle";
import SearchBar from "../features/search/components/searchBar";
import { createLinks, exploreLinks } from "@/types";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Menu, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function NavBar() {
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState<"create" | "explore">("create");

  const navLinks = activeTab === "create" ? createLinks : exploreLinks;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  if (isMobile) {
    return (
      <header className="w-full bg-primary shadow-xl">
        <div>
          <div className="navbar  h-16 p-6  mx-auto flex justify-between items-center">
            <div className=" ">
              <button
                onClick={toggleMenu}
                className="text-muted hover:text-muted/60"
              >
                {isOpen ? (
                  <X className="size-8" />
                ) : (
                  <Menu className="size-8" />
                )}
              </button>
            </div>
            <Link
              to="/"
              className="flex items-center space-x-2 text-muted hover:text-muted/60"
            >
              <IceCreamConeIcon className="size-7" />
              <span className="font-bold text-muted hover:text-muted/60 text-2xl">
                SCOOP SCIENCE
              </span>
            </Link>

            <UserDropDownMenu />
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 bg-muted p-3">
            <h1 className="text-center">Explore</h1>
            {exploreLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2  text-center hover:text-foreground/60 hover:underline font-medium"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <Separator className="my-2" />
            <h1 className="text-center">Create</h1>
            {createLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 text-center hover:text-foreground/60 hover:underline font-medium"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>
    );
  }
  return (
    <header className="w-full bg-primary shadow-xl">
      <div className="navbar flex h-16 items-center justify-between px-4 md:px-6 ">
        <div className="flex items-center  w-1/3">
          <Link to="/" className="flex items-center gap-1 w-2/5 h-16">
            <IceCreamConeIcon className="size-6 text-muted" />
            <span className="text-xl font-bold text-muted">SCOOP SCIENCE</span>
          </Link>
          <Button
            onClick={() => setActiveTab("create")}
            className={`btn-base ${
              activeTab === "create" ? "btn-active" : "btn-inactive"
            }`}
          >
            Create
          </Button>
          <Button
            onClick={() => setActiveTab("explore")}
            className={`btn-base ${
              activeTab === "explore" ? "btn-active" : "btn-inactive"
            }`}
          >
            Explore
          </Button>
        </div>

        <div className="relative flex-1 w-1/3 items-center ">
          <SearchBar className="w-full" />
        </div>

        <div className="w-1/3 flex items-center gap-4 justify-end p-6">
          <ModeToggle />
          <UserDropDownMenu />
        </div>
      </div>

      <nav className="bg-muted">
        <div className="container flex h-11 items-center gap-14 px-4 md:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
