import type { LoginInput, RegisterInput } from "../types/auth.type";
import api from "./api";

export const login = async (data: LoginInput) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterInput) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
