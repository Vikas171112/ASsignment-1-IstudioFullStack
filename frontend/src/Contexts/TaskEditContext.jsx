import { createContext, useState } from "react";

const TaskEditContext = createContext();

export const TaskEditContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  const closeEditModal = () => {
    setOpen(false);
    setTaskToEdit(null);
  };

  return (
    <TaskEditContext.Provider
      value={{
        open,
        openEditModal,
        closeEditModal,
        taskToEdit,
      }}
    >
      {children}
    </TaskEditContext.Provider>
  );
};

export default TaskEditContext;
