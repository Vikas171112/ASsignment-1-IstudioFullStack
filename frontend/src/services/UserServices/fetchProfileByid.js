import { axiosInstance } from "@/config/axiosInstance";

export const getProfileById = async (id) => {
  try {
    const response = await axiosInstance.get(`user/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};
