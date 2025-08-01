import { axiosInstance } from "@/config/axiosInstance";

export const deleteTaskService = async (taskId, token) => {
  const response = await axiosInstance.delete(`/task/delete/${taskId}`, {
    headers: {
      "x-access-token": token,
    },
  });
  return response.data;
};
