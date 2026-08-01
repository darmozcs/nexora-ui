import { LOGIN_PATH } from "@/DAL/const";
import type { User } from "@/models";
import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const loginService = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(LOGIN_PATH, payload);
  return data;
};
