import { AxiosResponse } from "axios";
import api from "./api";

export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response: AxiosResponse = await api.get(`/get/${endpoint}`);
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
    const response = await api.post(`/post/${endpoint}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

// Delete function
export async function deleteData(endpoint: string): Promise<void> {
  try {
    const response = await api.delete(`/${endpoint}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}
