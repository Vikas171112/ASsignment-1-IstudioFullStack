import TaskEditContext from "@/Contexts/TaskEditContext";
import { useContext } from "react";

export const useTaskEditContext = () => {
  return useContext(TaskEditContext);
};
