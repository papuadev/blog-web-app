import api from "./api";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data.data;
};

export const getPostById = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data.data;
};
