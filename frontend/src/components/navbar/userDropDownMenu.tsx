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
  const { user, logout, isGuest } = useAuth();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <User2Icon className="size-icon " />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Hello {user.username}!</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user.isAdmin && (
          <>
            <Link to="/control/dashboard">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {isGuest ? (
          <>
            {" "}
            <DropdownMenuItem
              onClick={() => {
                navigate("/auth");
              }}
            >
              Log In
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                navigate("/auth");
              }}
            >
              Logout
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
