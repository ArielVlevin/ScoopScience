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
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status code other than 2xx
      switch (error.response.status) {
        case 404:
          throw Error("We cannot find an account with that email address.");
        case 401:
          throw Error("Your password is incorrect.");
        case 500:
          throw Error(
            "Something went wrong on our end. Please try again later."
          );
        default:
          throw Error("An unexpected error occurred. Please try again.");
      }
    } else if (error.request) {
      throw Error(
        "No response from the server. Please check your connection and try again."
      );
    } else {
      throw Error("An unexpected error occurred. Please try again.");
    }
  }
}