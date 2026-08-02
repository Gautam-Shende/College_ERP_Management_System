import api from "../api/axios";

import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from "../types/auth";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post(
    "/users/login",

    data,
  );

  return response.data;
};

export const registerUser = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await api.post(
    "/users/register",

    data,
  );

  return response.data;
};
