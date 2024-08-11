import api from "@/config/api";

interface LoginResponse {
  user: {
    _id: string;
    username: string;
    email: string;
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
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user._id);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // You might want to handle this more gracefully
  }
}
