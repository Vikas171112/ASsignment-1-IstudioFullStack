import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskService } from "@/services/UserServices/TaskServices/deleteTaskService";
import { useAuthContext } from "../Contexts/useAuthContext";

export const useDeleteTaskHook = () => {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteTask,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (taskId) => deleteTaskService(taskId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["userTasks"]);
    },
  });

  return {
    deleteTask,
    isPending,
    isError,
    isSuccess,
    error,
  };
};
