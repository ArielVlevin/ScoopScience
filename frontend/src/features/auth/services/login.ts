import api from "@/config/api";

interface LoginResponse {
  token: string;
  // Include any other fields returned in the response
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
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // You might want to handle this more gracefully
  }
}
