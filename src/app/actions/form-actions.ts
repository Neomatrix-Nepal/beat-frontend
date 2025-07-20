import api from "@/src/hooks/useApi";
import { LoginData } from "@/src/types";

export const loginAction = async (bodyDto: LoginData) => {
  const response = await api.post("/auth/login", bodyDto);
  return response.data;
};
