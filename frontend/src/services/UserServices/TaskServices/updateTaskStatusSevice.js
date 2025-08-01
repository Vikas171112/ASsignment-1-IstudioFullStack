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
export const updateTaskDataService = async (
  taskId,
  token,
  title,
  description,
  dueDate
) => {
  try {
    const response = await axiosInstance.put(
      `/task/update/${taskId}`,
      {
        title,
        description,
        dueDate,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
