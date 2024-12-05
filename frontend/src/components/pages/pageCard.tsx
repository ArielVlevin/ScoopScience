import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui";
import { Separator } from "../ui/separator";
import { cn } from "@/utils/cn";
import { useTheme } from "@/contexts/ThemeProvider";
import Title from "../Text/title";

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
  const { settings } = useTheme();

  return (
    <Card className={cn(settings.cardGradient, className)}>
      <CardHeader>
        {title ? (
          <>
            <CardTitle className="text-2xl font-bold mt-2 mb-4 text-center">
              <Title> {title}</Title>
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
