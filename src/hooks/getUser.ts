const getUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API}users/${username}`
  );
  if (!res.ok) throw new Error("user not found");
  const data = await res.json();
  console.log(data);
  return data;
};

export default getUser;
