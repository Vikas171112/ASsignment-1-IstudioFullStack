import { signinApi } from "@/services/UserServices/loginUSer";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "./Contexts/useAuthContext";

export const useSigninAPihook = () => {
  const { login } = useAuthContext();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: signinMutation,
    error,
  } = useMutation({
    mutationFn: (userData) => signinApi(userData),
    onSuccess: (data) => {
      console.log(data, "✅ Signed In Successfully");
      if (data.token) {
        login(data.token, {
          email: data.email,
          id: data._id, // NOTE: _id or id — jo backend bhej raha ho, same use kar
        });
      }
    },
    onError: (error) => {
      console.log(" Sign In Failed", error);
    },
  });

  return {
    isError,
    isPending,
    isSuccess,
    signinMutation,
    error,
  };
};
