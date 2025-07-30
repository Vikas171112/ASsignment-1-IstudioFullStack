import { axiosInstance } from "@/config/axiosInstance";

export async function signupApi(userData) {
  try {
    const response = await axiosInstance.post("/user/signup", userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
}
