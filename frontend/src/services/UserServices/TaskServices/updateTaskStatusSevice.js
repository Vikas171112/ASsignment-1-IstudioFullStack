import { axiosInstance } from "@/config/axiosInstance";

export const updateTaskStatusService = async (taskId, newStatus, token) => {
  const response = await axiosInstance.put(
    `/task/update/${taskId}`,
    { status: newStatus },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response.data;
};
