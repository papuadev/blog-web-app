import type { User } from "./user.type";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: User;
};
