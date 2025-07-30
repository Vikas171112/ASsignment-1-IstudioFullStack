import React, { useState } from "react";
import SignupPage from "./SignupPage";
import { useSignupApiHook } from "@/hooks/useSignupApiHook";

function SignupPageContainer() {
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isPending, isSuccess, isError, signupMutation } = useSignupApiHook();
  // Input change handler
  function handleInputChange(e) {
    const { name, value } = e.target;
    setSignupDetails((previousDetails) => ({
      ...previousDetails,
      [name]: value,
    }));
  }

  // Form submit handler
  async function handleFormSubmission(e) {
    e.preventDefault();

    try {
      await signupMutation(signupDetails);
      console.log("Signup Details submitted:", signupDetails);
      setSignupDetails({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Signup Error", error);
    }
  }
  return (
    <SignupPage
      signupDetails={signupDetails}
      setSignupDetails={setSignupDetails}
      handleFormSubmission={handleFormSubmission}
      handleInputChange={handleInputChange}
    />
  );
}

export default SignupPageContainer;
