import { createTaskService } from "@/services/UserServices/TaskServices/createTaskService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../Contexts/useAuthContext";

export const useCreateTaskServiceHook = () => {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  console.log(token);

  const {
    isError,
    isPending,
    isSuccess,
    error,
    mutateAsync: taskMutation,
  } = useMutation({
    mutationFn: (taskData) => createTaskService(taskData, token),
    onSuccess: (data) => {
      console.log(data);
      console.log("✅ Task created, invalidating...");
      queryClient.invalidateQueries(["userTasks"]);
    },
    onError: (error) => {
      console.log("Task Creation Failed");
    },
  });
  return {
    isError,
    isSuccess,
    isPending,
    error,
    taskMutation,
  };
};
