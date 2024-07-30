import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IceCreamConeIcon, SearchIcon } from "@/components/icons/icon";
import { User2Icon } from "lucide-react";
import NewRecipeDialog from "@/features/recipes/features/newRecipe/components/newRecipeDialog";

export default function NavBar() {
  const pagesNav = [
    { name: "New Recipe", href: "/newRecipe" },
    { name: "Recipes", href: "/recipes" },
    { name: "Ingredients", href: "/Ingredients" },
  ];
  return (
    <header className="w-full bg-background">
      <div className="navbar flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <IceCreamConeIcon className="size-6" />
            <a className="text-xl  font-bold">SCOOP SCIENCE</a>
          </Link>
          <NewRecipeDialog />
        </div>

        <div className="relative flex-1 max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
            <Link to="/search">
              <SearchIcon className="w-4 h-4" />
            </Link>
          </div>
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md bg-muted pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User2Icon className="size-6" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="bg-muted">
        <div className="container flex h-11 items-center gap-14 px-4 md:px-6">
          {pagesNav.map((page) => (
            <Link
              key={page.name}
              to={page.href}
              className="text-sm font-medium hover:text-foreground"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

//        <div className="container flex h-12 items-center justify-center gap-6 px-4 md:px-6">

//              <img src="/placeholder.svg" width="36" height="36" className="rounded-full" alt="Avatar" />
