export const getUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API}users/${username}`
  );
  if (!res.ok) throw new Error("user not found");
  const data = await res.json();
  return data;
};

export const getUserSuggestion = async (query: string) => {
  const res = await fetch(`${import.meta.env.VITE_GITHUB_User}${query}`);
  if (!res.ok) throw new Error("not found");
  const data = await res.json();
  return data.items;
};
export const checkFollowingUser = async (user: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API}user/following/${user}`,
    {
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_GITHUB_API_PERSONAL_TOKKEN
        }`,
        Accept: "application/vnd.github+json",
      },
    }
  );
  if (res.status === 204) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else {
    const error = await res.json().catch(() => null);
    throw new Error(error.message || "Faild to send request");
  }
};
export const FollowAndUnfollow = async (user: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API}user/following/${user}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_GITHUB_API_PERSONAL_TOKKEN
        }`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Faild to Follow User");
  }
  return true;
};
export const UnFollowUser = async (user: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API}user/following/${user}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_GITHUB_API_PERSONAL_TOKKEN
        }`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Faild to unFollow User");
  }
  return true;
};
