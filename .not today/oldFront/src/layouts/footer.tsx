import { IceCreamConeIcon } from "@/components/icons/icon";
import { Link } from "react-router-dom";



export default function Footer(){
   return(
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
          <div className="grid gap-1">
            <Link to="/" >
              <IceCreamConeIcon className="h-8 w-8 text-primary" />
              <span className="sr-only">Scoop Science</span>
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Popular Recipes</h3>
            <Link to="#">
              Vanilla Ice Cream
            </Link>
            <Link to="#">
              Chocolate Chip Cookie Dough
            </Link>
            <Link to="#">
              Strawberry Sorbet
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link to="#" >
              About
            </Link>
            <Link to='contact'>
              Contact
            </Link>
            <Link to="#" >
              FAQ
            </Link>
          </div>
          <div className="grid gap-1">
            <p className="text-muted-foreground">&copy; 2024 Ice Cream Recipes. All rights reserved.</p>
          </div>
        </div>
      </footer>
   )
}