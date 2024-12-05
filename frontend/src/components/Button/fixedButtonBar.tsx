import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type OnClickType = (() => void) | ((e: React.FormEvent) => Promise<void>);

type FixedButtomBarProps = {
  onClick: OnClickType;
  btmClassName?: string;
  className?: string;
  btmText?: string;

  scndBtmText?: string;
  scndBtmOnClick?: () => void;
};
export default function FixedButtomBar({
  btmClassName,
  className,
  onClick,
  btmText = "Save and Continue",
  scndBtmText,
  scndBtmOnClick,
}: FixedButtomBarProps) {
  return (
    <div
      className={cn(
        " fixed bottom-0 left-0 right-0 bg-muted shadow  border-t border-border p-4 sm:p-6  ",
        className
      )}
    >
      <div className="container mx-auto flex justify-end gap-4">
        {scndBtmText && (
          <Button size="lg" className={btmClassName} onClick={scndBtmOnClick}>
            {scndBtmText}
          </Button>
        )}
        <Button size="lg" className={btmClassName} onClick={onClick}>
          {btmText}
        </Button>
      </div>
    </div>
  );
}
