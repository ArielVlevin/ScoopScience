import { cn } from "@/utils/cn";
import SkeltonCard from "../Card/Skelton";

type SkeltonCardGridProps = {
  length: number;
  className?: string;
};

export const SkeletonCardGrid = ({
  length = 9,
  className,
}: SkeltonCardGridProps) => {
  return (
    <div className={cn(className, "grid grid-cols-3 gap-4")}>
      {Array.from({ length: length }).map((_, index) => (
        <SkeltonCard key={index} />
      ))}
    </div>
  );
};
