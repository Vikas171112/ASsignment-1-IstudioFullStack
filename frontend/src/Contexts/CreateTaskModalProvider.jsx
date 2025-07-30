import React, { createContext, useState } from "react";
const CreateTaskContext = createContext();

export const CreateTaskModalContextProvider = ({ children }) => {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  return (
    <CreateTaskContext.Provider
      value={{ openCreateTaskModal, setOpenCreateTaskModal }}
    >
      {children}
    </CreateTaskContext.Provider>
  );
};

export default CreateTaskContext;
