import { getUser } from "@/hooks/getUser";
import type { GitHubData } from "@/types/types";
import { ArrowUpLeft, Clock } from "lucide-react";
type SuggestionType = {
  item: GitHubData;
  preFetch: {
    prefetchQuery: (options: {
      queryKey: readonly string[];
      queryFn: () => Promise<any>;
    }) => void;
  };
  onselect: (login: string) => void;
  setShowSuggestion: React.Dispatch<React.SetStateAction<boolean>>;
  setRecentSearch: React.Dispatch<React.SetStateAction<string[]>>;
};
const SuggestionList = ({
  item,
  preFetch,
  onselect,
  setShowSuggestion,
  setRecentSearch,
}: SuggestionType) => {
  return (
    <>
      <div
        key={item.id}
        onClick={() => {
          onselect(item.login);
          setShowSuggestion(false);
          setRecentSearch((perv: string[]) => [item.login, ...perv]);
        }}
        onMouseEnter={() => {
          preFetch.prefetchQuery({
            queryKey: ["users", "github-user-Suggestion", item.login],
            queryFn: () => getUser(item.login),
          });
        }}
        className="flex items-center gap-3  px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/30 cursor-pointer group/item"
      >
        <Clock
          size={14}
          className="text-zinc-600 group-hover/item:text-emerald-400 shrink-0 transition-colors"
        />
        <img src={item.avatar_url} className="w-8 h-8 rounded-full" />
        <span className="text-md text-zinc-300 group-hover/item:text-white truncate flex-1 transition-colors">
          {item.login}
        </span>
        <ArrowUpLeft
          size={14}
          className="text-zinc-600 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0"
        />
      </div>
    </>
  );
};

export default SuggestionList;
