import type { CreatePost } from "../types/post.type";
import api from "./api";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data.data;
};

export const getPostById = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data.data;
};

export const createPost = async (data: CreatePost) => {
  const response = await api.post("/posts", data);
  return response.data;
};

export const updatePost = async (id: number, data: CreatePost) => {
  const response = await api.put(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
