import Page from "@/components/class/page";
import { Link } from "react-router-dom";

//TODO:: add to icon file
import { FileHeartIcon } from "lucide-react";

export default function ZeroFavorites() {
  return (
    <Page className="flex flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="inline-block rounded-full bg-muted p-3">
          <FileHeartIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You have no favorite recipes yet
        </h1>
        <p className="mt-4 text-muted-foreground">
          Discover new recipes and save your favorites to access them easily.
        </p>
        <div className="mt-6">
          <Link
            to="/recipes"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Discover Recipes
          </Link>
        </div>
      </div>
    </Page>
  );
}
