import { Link } from "react-router-dom";

import errorImg from "@/assets/error.jpeg";
import Page from "@/components/pages/page";

const madeUpError =
  "It looks like a scoop of ice cream has fallen on the floor. We're sorry for the mess, but don't worry, we'l clean it up in no time.";
export default function ErrorPage({ error = madeUpError }: { error?: string }) {
  return (
    <Page>
      <div className="mx-auto max-w-md text-center">
        <img
          src={errorImg}
          alt="Error scene"
          className="mx-auto mb-6 rounded-lg"
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something scooped up!
        </h1>
        <p className="mt-4 text-muted-foreground">{error}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </Page>
  );
}
