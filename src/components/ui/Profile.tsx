import { useState } from "react";
import Suggestion from "./Suggestion";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Globe } from "lucide-react";
import { TfiGithub } from "react-icons/tfi";
import Card from "./Card";

const Profile = () => {
  const [username, setUsername] = useState<string | number>("");
  const [submittedUser, setsubmittedUser] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", username],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_GITHUB_API}users/${username}`
      );
      if (!res.ok) throw new Error("user not found");
      const data = await res.json();
      console.log(data);
      return data;
    },
    enabled: !!username,
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
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
        )}
        {isError && (
          <div
            role="alert"
            className="bg-red-100 dark:bg-red-900 border-l-4 w-full border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
          >
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 shrink-0 mr-2 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
            <p className="text-md font-semibold">{error?.message}</p>
          </div>
        )}
        {data && <Card data={data} />}
      </article>
    </>
  );
};

export default Profile;
