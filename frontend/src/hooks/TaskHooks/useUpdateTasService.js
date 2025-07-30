import { updateTaskStatusService } from "@/services/UserServices/TaskServices/updateTaskStatusSevice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../Contexts/useAuthContext";

export const useUpdateTaskStatusHook = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ taskId, newStatus }) =>
      updateTaskStatusService(taskId, newStatus, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["userTasks"]);
    },
  });

  return { mutateAsync, isPending };
};
