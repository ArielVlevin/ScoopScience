import api from "@/services/api";

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // You might want to handle this more gracefully
  }
}
