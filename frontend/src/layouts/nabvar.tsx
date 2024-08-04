import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IceCreamConeIcon } from "@/components/icons/icon";
import NewRecipeDialog from "@/features/recipes/features/newRecipe/components/newRecipeDialog";

import "./navbar/style/navbarBtn.css";
import UserDropDownMenu from "./navbar/components/userDropDownMenu";
import Search from "@/components/class/search";
import { useAuth } from "@/contexts/AuthContext";
import { ModeToggle } from "@/layouts/navbar/components/modeToggle";

export default function NavBar() {
  const { user, logout, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<"create" | "discovery">("create");

  const pagesNav = [
    { name: "New Recipe", href: "/newRecipe" },
    { name: "Recipes", href: "/recipes" },
    { name: "Ingredients", href: "/Ingredients" },
  ];

  const createLinks = [
    { name: "New Recipe", href: "/newRecipe" },
    { name: "My Recipes", href: "/myRecipes" },
    { name: "Drafts", href: "/drafts" },
  ];

  const discoveryLinks = [
    { name: "Explore Recipes", href: "/recipes" },
    { name: "Top Rated", href: "/topRated" },
    { name: "Newest", href: "/newest" },
  ];

  const navLinks = activeTab === "create" ? createLinks : discoveryLinks;

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
            onClick={() => setActiveTab("discovery")}
            className={`btn-base ${
              activeTab === "discovery" ? "btn-active" : "btn-inactive"
            }`}
          >
            Discovery
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
          <NewRecipeDialog />
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
