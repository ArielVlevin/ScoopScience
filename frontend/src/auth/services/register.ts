import api from "@/config/api";

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    console.error("Error registering user:", error);
    throw error;
  }
}
