import { useSigninAPihook } from "@/hooks/useloginApiHook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";

export const LoginPageContainer = () => {
  const navigate = useNavigate();

  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });

  const { isPending, isError, isSuccess, signinMutation, error } =
    useSigninAPihook();

  function handleInputchange(e) {
    const { name, value } = e.target;
    setSigninDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleFormSubmission(e) {
    e.preventDefault();
    console.log("🔥 Submitted Details:", signinDetails);
    try {
      await signinMutation(signinDetails);
      setSigninDetails({ email: "", password: "" });
    } catch (err) {
      console.error("Signin error:", err);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  return (
    <LoginPage
      signinDetails={signinDetails || { email: "", password: "" }}
      handleInputchange={handleInputchange}
      handleFormSubmission={handleFormSubmission}
      isPending={isPending}
      isError={isError}
      isSuccess={isSuccess}
      error={error}
    />
  );
};
