import { useEffect, useState } from "react";
import Suggestion from "./Suggestion";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { TfiGithub } from "react-icons/tfi";
import Card from "./Card";
import getUser from "@/hooks/getUser";
import type { GitHubData } from "@/types/types";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [submittedUser, setsubmittedUser] = useState("");
  useEffect(() => {
    const Time = setTimeout(() => setsubmittedUser(username), 700);
    return () => clearTimeout(Time);
  }, [username]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUser],
    queryFn: () => getUser(submittedUser),
    enabled: !!submittedUser,
  });

  return (
    <>
      <article className="w-full max-w-sm  rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-zinc-900/40 ">
        {/* Profile Picture */}
        <div className="w-full relative group/search z-50">
          {/* Search Input Container */}
          <div className="w-full h-12 rounded-xl border-2 border-dashed bg-zinc-900/50 border-zinc-700 mb-13 flex items-center gap-3 px-4">
            <Input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Search User"
              className="flex-1 w-full  border-none ring-0 outline-none text-sm text-white placeholder-zinc-600 focus:ring-0"
            />
          </div>
          <Suggestion />
        </div>
        {isLoading && (
          <div className="flex flex-row mt-2 gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]">
              <TfiGithub />
            </div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]">
              <TfiGithub />
            </div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]">
              <TfiGithub />
            </div>
          </div>
        )}
        {isError && (
          <div
            role="alert"
            className="bg-red-100 text-center flex justify-center align-middle  p-3 dark:bg-red-900  gap-3 border-l-4 w-full border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 rounded-lg  items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform"
          >
            <TfiGithub />
            <p className="text-md text-center font-semibold">
              {error?.message}
            </p>
          </div>
        )}
        {data && <Card data={data} />}
      </article>
    </>
  );
};

export default Profile;
