import { useEffect } from "react";
import debounce from "lodash/debounce";

type UseInfiniteScrollOptions = {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  offset?: number;
  offsetType?: "px" | "%";
};
export const useInfiniteScroll = ({
  isLoading,
  hasMore,
  onLoadMore,
  offset = 100,
  offsetType = "px",
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const triggerPoint =
        offsetType === "%" ? scrollHeight * (offset / 100) : offset;

      if (
        scrollTop + clientHeight >= scrollHeight - triggerPoint &&
        !isLoading &&
        hasMore
      ) {
        onLoadMore();
      }
    }, 1000); // 1 sec limit between scroll events

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Clean debounce
    };
  }, [isLoading, hasMore, onLoadMore, offset, offsetType]);
};
