import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

//TODO:: Add User Icon to icons component
import { User2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function UserDropDownMenu() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <User2Icon className="size-icon " />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>

      {isAuthenticated ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            //todo:repair(do not show username) Hello, {user?.username}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem>My Recipes</DropdownMenuItem>
          <DropdownMenuItem>Saved Recipes</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              navigate("/auth");
            }}
            className="w-full flex justify-centers"
          >
            <div>Login | Register </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
