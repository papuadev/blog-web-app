import { z } from "zod";

const field = {
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content is required"),
};

export const postSchema = z.object({
  title: field.title,
  content: field.content,
});
