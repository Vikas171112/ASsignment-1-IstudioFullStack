import { signupApi } from "@/services/UserServices/signUpUser";
import { useMutation } from "@tanstack/react-query";

export const useSignupApiHook = () => {
  const {
    isError,
    isPending,
    isSuccess,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: (userData) => signupApi(userData),
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  return {
    isPending,
    isSuccess,
    isError,
    signupMutation,
  };
};
