import axios, { AxiosResponse } from "axios";
import api from "../config/api";

export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response: AxiosResponse = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

// Post function
export async function postData<T>(endpoint: string, data: T): Promise<T> {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

// Delete function
export async function deleteData<T>(endpoint: string, data?: T): Promise<T> {
  try {
    const response = await api.delete(endpoint, { data: data });
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}
