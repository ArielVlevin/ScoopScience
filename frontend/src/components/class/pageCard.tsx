import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui";
import { Separator } from "../ui/separator";
import { cn } from "@/utils/cn";

interface PageCardProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  cardFooter?: React.ReactNode;
}

const PageCard = ({
  className,
  title,
  children,
  cardFooter,
}: PageCardProps) => {
  return (
    <Card className={cn("bg-muted", className)}>
      <CardHeader>
        {title ? (
          <>
            <CardTitle className="text-2xl font-bold mt-2 mb-4">
              {title}
            </CardTitle>
            <Separator />
          </>
        ) : null}
      </CardHeader>
      {children ? (
        <CardContent className="space-y-4">{children}</CardContent>
      ) : null}
      <CardFooter className="flex justify-end">{cardFooter}</CardFooter>
    </Card>
  );
};

export default PageCard;
