import AuthContext from "@/Contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
