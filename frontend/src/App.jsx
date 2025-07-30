import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateTaskModalContextProvider } from "./Contexts/CreateTaskModalProvider";
import CreateTaskModal from "./Modals/CreateTaskModal";
import { AuthContextProvider } from "./Contexts/AuthContext";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          {" "}
          <CreateTaskModalContextProvider>
            <AppRoutes />
            <CreateTaskModal />
          </CreateTaskModalContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
