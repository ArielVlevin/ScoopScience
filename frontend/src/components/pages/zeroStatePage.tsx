import React from "react";
import Page from "@/components/pages/page";
import { Link } from "react-router-dom";
import PageCard from "./pageCard";

interface ZeroStateProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ZeroStatePage: React.FC<ZeroStateProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  Icon,
}) => {
  return (
    <Page>
      <PageCard>
        <div className="mx-auto max-w-md text-center">
          <div className="inline-block rounded-full bg-muted p-3">
            <Icon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-muted-foreground">{description}</p>
          <div className="mt-6">
            <Link
              to={buttonLink}
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </PageCard>
    </Page>
  );
};

export default ZeroStatePage;
