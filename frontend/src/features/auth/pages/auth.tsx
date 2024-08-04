import { Link } from "react-router-dom";
import AuthCard from "../components/authCard";
import { IceCreamConeIcon } from "@/components/icons/icon";

export default function AuthPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className=" grid-col-1 gap-2 grid ">
        <div className="flex size-12 items-center justify-center w-screen">
          <Link to="/" className="flex items-center gap-1  h-16">
            <span className="text-4xl font-bold text-primary">SCOOP</span>
            <IceCreamConeIcon className="size-9 text-primary " />

            <span className="text-4xl font-bold text-primary">SCIENCE</span>
          </Link>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <AuthCard />
        </div>
      </div>
    </div>
  );
}
