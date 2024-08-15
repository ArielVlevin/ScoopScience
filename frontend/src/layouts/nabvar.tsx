import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IceCreamConeIcon } from "@/components/icons/icon";

import "./navbarBtn.css";
import UserDropDownMenu from "../components/navbar/userDropDownMenu";
import Search from "@/components/class/search";
import { ModeToggle } from "@/components/navbar/modeToggle";
import NewRecipeDialog from "@/features/recipes/components/newRecipe/newRecipe";

export default function NavBar() {
  const [activeTab, setActiveTab] = useState<"create" | "explore">("create");

  const createLinks = [
    //todo:{ name: "New Recipe", href: "/newrecipe" },
    { name: "My Recipes", href: "/user/recipes" },
    {
      name: "My Favorites",
      href: "/user/favorites",
    },
  ];

  const exploreLinks = [
    { name: "Explore Recipes", href: "/recipes" },
    { name: "Top Rated(!)", href: "/topRated" },
    { name: "Newest(!)", href: "/newest" },
    { name: "Ingredients", href: "/Ingredients" },
  ];

  const navLinks = activeTab === "create" ? createLinks : exploreLinks;

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
          <Search url="/search" className="w-full" />
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
