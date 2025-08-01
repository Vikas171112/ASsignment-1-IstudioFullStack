import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateTaskModalContextProvider } from "./Contexts/CreateTaskModalProvider";
import CreateTaskModal from "./Modals/CreateTaskModal";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { TaskEditContextProvider } from "./Contexts/TaskEditContext";
import EditTaskModal from "./Modals/EditTaskModal";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          {" "}
          <TaskEditContextProvider>
            <CreateTaskModalContextProvider>
              <AppRoutes />
              <CreateTaskModal />
              <EditTaskModal />
            </CreateTaskModalContextProvider>
          </TaskEditContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
