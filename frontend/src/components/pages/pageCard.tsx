import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui";
import { Separator } from "../ui/separator";
import { cn } from "@/utils/cn";
import { useTheme } from "@/contexts/ThemeProvider";
import Title from "../Text/title";

interface PageCardProps {
  className?: string;
  title?: string;
  titleBtn1onClick?: () => void;
  titleBtn1Title?: string;
  titleBtn1Disable?: boolean;
  titleBtn2onClick?: () => void;
  titleBtn2Title?: string;
  titleBtn2Disable?: boolean;
  children?: React.ReactNode;
  cardFooter?: React.ReactNode;
}

const PageCard = ({
  className,
  title,
  titleBtn1onClick,
  titleBtn1Title,
  titleBtn1Disable,
  titleBtn2onClick,
  titleBtn2Title,
  titleBtn2Disable,
  children,
  cardFooter,
}: PageCardProps) => {
  const { settings } = useTheme();

  return (
    <Card className={cn(settings.cardGradient, className)}>
      <CardHeader>
        {title && (
          <>
            <div className="flex justify-between">
              <div>
                {titleBtn1onClick && (
                  <Button
                    onClick={titleBtn1onClick}
                    disabled={titleBtn1Disable}
                  >
                    {titleBtn1Title}
                  </Button>
                )}
              </div>
              <div>
                {title && (
                  <CardTitle className="text-2xl font-bold mt-2 mb-4 text-center text-primary">
                    <Title> {title}</Title>
                  </CardTitle>
                )}
              </div>
              <div>
                {titleBtn2onClick && (
                  <Button
                    onClick={titleBtn2onClick}
                    disabled={titleBtn2Disable}
                  >
                    {titleBtn2Title}
                  </Button>
                )}
              </div>
            </div>
            <Separator />
          </>
        )}
      </CardHeader>
      {children ? (
        <CardContent className="space-y-4">{children}</CardContent>
      ) : null}
      <CardFooter className="flex justify-end">{cardFooter}</CardFooter>
    </Card>
  );
};

export default PageCard;
