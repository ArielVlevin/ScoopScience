import { Link } from "../../../../node_modules1/react-router-dom/dist";
import { SearchIcon } from "../icons/icon";
import { Input } from "../ui/input";

type SearchProps = {
  className?: string;
  url: string;
  placeHolder?: string;
};

export default function Search({
  className,
  url,
  placeHolder = "Search...",
}: SearchProps) {
  return (
    <div className={className}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ">
        <Link to={url}>
          <SearchIcon className="size-4 text-primary justify-center" />
        </Link>
      </div>
      <Input
        type="search"
        placeholder={placeHolder}
        className="w-full rounded-full bg-muted pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
