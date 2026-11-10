
import api from "./api";

interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  message?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const login = async (
  data: LoginData
): Promise<AuthResponse> => {
  const body = new URLSearchParams();

  body.append("username", data.email.trim());
  body.append("password", data.password);

  const response = await api.post(
    "/auth/login",
    body,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

export const registerUser = async (
  data: RegisterData
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

// Google Login and Google Sign Up
export const googleLogin = async (
  credential: string
): Promise<AuthResponse> => {
  const response = await api.post(
    "/auth/google",
    {
      credential,
    }
  );

  return response.data;
};
