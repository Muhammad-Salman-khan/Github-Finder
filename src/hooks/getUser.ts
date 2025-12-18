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
