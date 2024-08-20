import api from "@/config/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/refresh",
      { refreshToken: refreshToken }
    );
    return response.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios errors specifically
      console.error(
        "Axios error details:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error refreshing access token:", error);
    }
    throw new Error("Unable to refresh token, please login again.");
  }
}

interface JwtPayloadWithExp {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  const { exp } = jwtDecode<JwtPayloadWithExp>(token);
  return Date.now() >= exp * 1000; // Convert exp from seconds to milliseconds
};

export { isTokenExpired };
