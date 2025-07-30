import { getProfileById } from "@/services/UserServices/fetchProfileByid";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./Contexts/useAuthContext";

export const useFetchByIdHook = () => {
  const { user } = useAuthContext();
  const id = user?.id || JSON.parse(localStorage.getItem("user"))?._id;

  console.log("✅ ID:", id);

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: userData,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id),
    enabled: !!id,
  });

  return {
    isLoading,
    isError,
    error,
    isSuccess,
    userData,
  };
};
