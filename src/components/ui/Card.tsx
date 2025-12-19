import {
  checkFollowingUser,
  FollowAndUnfollow,
  UnFollowUser,
} from "@/hooks/getUser";
import type { GitHubData } from "@/types/types";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Globe } from "lucide-react";
import { TfiGithub } from "react-icons/tfi";
import { Button } from "./button";

const Card = ({ data }: { data: GitHubData }) => {
  const {
    data: isFollowing,
    refetch,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["follow-status", data.login],
    queryFn: () => checkFollowingUser(data.login),
    enabled: !!data.login,
  });
  const FollowMutation = useMutation({
    mutationFn: () => FollowAndUnfollow(data.login),
    onSuccess: () => {
      toast.success(`you are following ${data.login}`);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const Unfollow = useMutation({
    mutationFn: () => UnFollowUser(data.login),
    onSuccess: () => {
      toast.success(`you are no longer following ${data.login}`);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleMutate = () => {
    if (isFollowing) {
      Unfollow.mutate();
    } else {
      FollowMutation.mutate();
    }
  };
  return (
    <>
      <div className=" mb-5 flex justify-center align-middle items-center">
        <div className="w-24 h-24 rounded-full p-1 bg-linear-to-tr from-zinc-700 to-zinc-900 shadow-xl">
          <img
            src={data.avatar_url}
            alt={`${data.name} profile picture`}
            className="w-full h-full rounded-full object-cover border-2 border-zinc-950"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-1">{data.name}</h2>
      <p className="text-zinc-500 text-sm font-medium mb-2">{data.login}</p>
      <p className="text-white text-sm font-medium mb-6">{data.bio}</p>
      <div className="flex items-center justify-center gap-8 w-full mb-3 border-y border-zinc-800/50 py-4">
        <div className="flex flex-col items-center gap-1 cursor-pointer group">
          <span className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">
            {data.followers}
          </span>
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">
            Followers
          </span>
        </div>
        <div className="w-px h-8 bg-zinc-800/50"></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer group">
          <span className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">
            {data.following}
          </span>
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">
            Following
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 w-full mb-8 border-y border-zinc-800/50 py-4">
        <div className="flex flex-col items-center gap-1 cursor-pointer group">
          <span className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">
            {data.public_repos}
          </span>
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">
            repos
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full space-y-3">
        <Button
          disabled={Unfollow.isPending || FollowMutation.isPending}
          onClick={handleMutate}
          className={`w-full ${
            isFollowing ? "bg-black text-white" : "bg-white text-zinc-950"
          } flex items-center justify-center gap-2  py-3 rounded-xl font-bold text-sm transition-all hover:bg-zinc-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900`}
        >
          {isFollowing ? "following" : "Follow"}
        </Button>

        <a
          href={data.html_url}
          target="_blank"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all group/link"
        >
          <Globe size={16} />
          <span>View Profile</span>
          <TfiGithub
            size={14}
            className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
          />
        </a>
      </div>
    </>
  );
};

export default Card;
