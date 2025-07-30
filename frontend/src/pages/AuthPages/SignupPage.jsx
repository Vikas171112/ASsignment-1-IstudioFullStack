import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupApiHook } from "@/hooks/useSignupApiHook";
import React, { useState } from "react";

function SignupPage({
  signupDetails,
  setSignupDetails,
  handleInputChange,
  handleFormSubmission,
}) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter Your details to create Your Account
          </CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmission}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={signupDetails.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={signupDetails.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={signupDetails.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Button type="submit" onClick={handleFormSubmission}>
                  Create Your Account
                </Button>
                <Button>Login</Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {/* <p>
            New to Page{" "}
            <span>
              <a href="/signup">Create Your Account</a>
            </span>
          </p> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignupPage;
