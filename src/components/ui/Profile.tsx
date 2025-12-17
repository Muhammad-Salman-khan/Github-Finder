import { useState } from "react";
import Suggestion from "./Suggestion";
import { useQuery } from "@tanstack/react-query";
import { TfiGithub } from "react-icons/tfi";
import Card from "./Card";
import getUser from "@/hooks/getUser";
import LoadingAnimation from "./LoadingAnimation";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [submittedUser, setsubmittedUser] = useState("");
  const [ShowSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUser],
    queryFn: () => getUser(submittedUser),
    enabled: !!submittedUser,
  });
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setsubmittedUser(trimmed);
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
              onBlur={() => setShowSuggestion(false)}
              value={username}
              placeholder="Search GitHub username..."
              className="flex-1 w-full h-full bg-transparent border-none ring-0 outline-none text-base text-white placeholder-slate-500 focus:ring-0 pl-3 pr-12"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !username}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 sm:px-6 rounded-lg bg-cyan-500 text-slate-900 font-semibold text-sm hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
        <div className="mt-5 w-full">
          {recentSearch && ShowSuggestion === true && (
            <Suggestion RecentSearch={recentSearch} />
          )}
        </div>
        {isLoading && <LoadingAnimation />}
        {isError && (
          <div
            role="alert"
            className="bg-red-100 text-center flex justify-center align-middle  p-3 dark:bg-red-900  gap-3 border-l-4 w-full border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 rounded-lg  items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform"
          >
            <TfiGithub />
            <p className="text-md uppercase font-extrabold text-center font-semibold">
              {error?.message}
            </p>
          </div>
        )}
        <div className="m-3">{data && <Card data={data} />}</div>
      </div>
    </>
  );
};

export default Profile;
