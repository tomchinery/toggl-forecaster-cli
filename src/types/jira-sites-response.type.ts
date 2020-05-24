export type JiraSite = {
  id: string;
  url: string;
  name: string;
  scopes: string[];
  avatarUrl: string;
}

export type JiraSitesResponse = JiraSite[];
