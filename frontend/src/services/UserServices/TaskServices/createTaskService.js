import { axiosInstance } from "@/config/axiosInstance";
import { useAuthContext } from "@/hooks/Contexts/useAuthContext";

export const createTaskService = async (
  { title, description, dueDate },
  token
) => {
  try {
    const response = await axiosInstance.post(
      "task/createtask",
      { title, description, dueDate },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};
