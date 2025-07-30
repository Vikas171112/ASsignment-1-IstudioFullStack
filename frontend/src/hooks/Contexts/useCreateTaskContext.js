import CreateTaskContext from "@/Contexts/CreateTaskModalProvider";
import { useContext } from "react";

export const useCreateTaskModalContext = () => {
  return useContext(CreateTaskContext);
};
