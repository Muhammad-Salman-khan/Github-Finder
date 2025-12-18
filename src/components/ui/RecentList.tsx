import { getUser } from "@/hooks/getUser";
import { ArrowUpLeft, Clock } from "lucide-react";
const RecentList = ({ item, preFetch, onselect, setShowSuggestion }: any) => {
  return (
    <>
      <div
        onClick={() => {
          onselect(item);
          setShowSuggestion(false);
        }}
        onMouseEnter={() => {
          preFetch.prefetchQuery({
            queryKey: ["users", item],
            queryFn: () => getUser(item),
          });
        }}
        className="flex items-center gap-3  px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/30 cursor-pointer group/item"
      >
        <Clock
          size={14}
          className="text-zinc-600 group-hover/item:text-emerald-400 shrink-0 transition-colors"
        />
        <span className="text-sm text-zinc-300 group-hover/item:text-white truncate flex-1 transition-colors">
          {item}
        </span>
        <ArrowUpLeft
          size={14}
          className="text-zinc-600 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0"
        />
      </div>
    </>
  );
};

export default RecentList;
