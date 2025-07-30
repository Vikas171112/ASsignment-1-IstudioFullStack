import { axiosInstance } from "@/config/axiosInstance";

export async function signinApi(userData) {
  try {
    const response = await axiosInstance.post("/user/signin", userData);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
}
