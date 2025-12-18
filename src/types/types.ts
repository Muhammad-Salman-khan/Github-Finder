export type GitHubData = {
  id?: number;
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: string | number;
  following: string | number;
  html_url: string;
  created_at: string;
  public_repos?: string | number;
};
