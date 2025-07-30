import { axiosInstance } from "@/config/axiosInstance";

export const getTasksByUser = async () => {
  try {
    const token = localStorage.getItem("userToken");

    const response = await axiosInstance.get(`/task/my/tasks`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
