import { useState } from "react";
import Suggestion from "./Suggestion";
import { useQuery } from "@tanstack/react-query";
import { TfiGithub } from "react-icons/tfi";
import Card from "./Card";
import type { GitHubData } from "../../types/types";
import { getUser, getUserSuggestion } from "@/hooks/getUser";
import LoadingAnimation from "./LoadingAnimation";
import { Button } from "./button";
import { useDebounce } from "use-debounce";
import ErrorMessage from "./ErrorMessage";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [submittedUser, setsubmittedUser] = useState("");
  const [ShowSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [debounceUser] = useDebounce(username, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUser],
    queryFn: () => getUser(submittedUser),
    enabled: !!submittedUser,
  });
  const { data: Suggestions } = useQuery({
    queryKey: ["github-user-Suggestion", debounceUser],
    queryFn: () => getUserSuggestion(debounceUser),
    enabled: debounceUser.length > 1,
  });
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setsubmittedUser(trimmed);
    setShowSuggestion(false);
    setRecentSearch((perv) => {
      const updated = [trimmed, ...perv.filter((i) => i !== trimmed)];
      return updated.slice(0, 4);
    });
  };
  return (
    <>
      <div className="w-full max-w-sm  rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-zinc-900/40 ">
        <div className="w-full relative group/search z-50">
          {/* Search Input Container */}
          <form
            onSubmit={HandleSubmit}
            className=" flex items-center w-full h-14 rounded-xl border-2 border-dashed bg-slate-800/50 border-slate-700 focus-within:border-cyan-400 transition-colors duration-300"
          >
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
              value={username}
              placeholder="Search GitHub username..."
              className="flex-1 w-full h-full bg-transparent border-none ring-0 outline-none text-base text-white placeholder-slate-500 focus:ring-0 pl-3 pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !username}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 sm:px-6 rounded-lg bg-slate-950 text-white font-semibold text-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>
        <div onChange={() => setShowSuggestion(false)} className="mt-5 w-full">
          {recentSearch && ShowSuggestion && (
            <Suggestion
              RecentSearch={recentSearch}
              Suggestions={Suggestions}
              onselect={(e: any) => {
                setUsername(e);
                setsubmittedUser(e);
              }}
            />
          )}
        </div>
        {isLoading && <LoadingAnimation />}
        {isError && <ErrorMessage error={error} />}
        <div className="m-3">{data && <Card data={data} />}</div>
      </div>
    </>
  );
};

export default Profile;
