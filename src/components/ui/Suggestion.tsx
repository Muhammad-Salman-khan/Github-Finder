import { getUser } from "@/hooks/getUser";
import {
  QueryClient,
  usePrefetchQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { GitHubData } from "../../types/types";
import { Clock, ArrowUpLeft } from "lucide-react";
import SuggestionList from "./SuggestionList";
import RecentList from "./RecentList";
const Suggestion = ({
  RecentSearch,
  onselect,
  Suggestions,
  setShowSuggestion,
  setRecentSearch,
}: any) => {
  const preFetch = useQueryClient();
  return (
    <>
      <div className=" relative -top-3  z-10 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="max-h-400 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-2 bg-zinc-900/30 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-left border-b border-zinc-800/50 sticky top-0 backdrop-blur-sm">
            Suggestions
          </div>
          {Suggestions?.slice(0, 5).map((item: GitHubData) => (
            <SuggestionList
              preFetch={preFetch}
              item={item}
              onselect={onselect}
              setShowSuggestion={setShowSuggestion}
              setRecentSearch={setRecentSearch}
            />
          ))}
          <div className="px-4 py-2 bg-zinc-900/30 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-left border-b border-zinc-800/50 sticky top-0 backdrop-blur-sm">
            Recent Search
          </div>
          {RecentSearch.map((item: any) => (
            <RecentList
              key={item.id}
              preFetch={preFetch}
              item={item}
              onselect={onselect}
              setShowSuggestion={setShowSuggestion}
              setRecentSearch={setRecentSearch}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Suggestion;
