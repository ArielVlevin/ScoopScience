import api from "@/config/api";

interface LoginResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    favorites: number[];
  };
  token: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
