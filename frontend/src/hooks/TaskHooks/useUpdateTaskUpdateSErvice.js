// ✅ hooks/TaskHooks/useUpdateTaskData.js

import { updateTaskDataService } from "@/services/UserServices/TaskServices/updateTaskStatusSevice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../Contexts/useAuthContext";

export const useUpdateTaskData = () => {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateData,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({ taskId, title, description, dueDate }) =>
      updateTaskDataService(taskId, token, title, description, dueDate),
    onSuccess: () => {
      // Invalidate your tasks list to refetch!
      queryClient.invalidateQueries(["userTasks"]);
    },
  });

  return {
    updateData, // ✅ THIS must be returned
    isPending,
    isError,
    isSuccess,
    error,
  };
};
