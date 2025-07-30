import React from "react";
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
import { FaCheck } from "react-icons/fa";
import { LucideLoader2, TriangleAlert } from "lucide-react";

function LoginPage({
  isPending,
  isSuccess,
  isError,
  error,
  signinDetails,
  handleInputchange,
  handleFormSubmission,
}) {
  console.log("🎯 LoginPage props signinDetails:", signinDetails);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email to login to your account
          </CardDescription>

          {isError && error && (
            <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert className="size-5" />
              <p>{error.message || "Login Error"}</p>
            </div>
          )}

          {isSuccess && (
            <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5">
              <FaCheck className="size-5" />
              <p>
                Successfully signed in. You will be redirected to the home page
                in a few seconds.
                <LucideLoader2 className="animate-spin ml-2" />
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleFormSubmission}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={signinDetails.email || ""}
                  onChange={handleInputchange}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  value={signinDetails.password || ""}
                  onChange={handleInputchange}
                  type="password"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Logging In..." : "Login"}
                </Button>
                <Button variant="outline">Create Your Account</Button>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter />
      </Card>
    </div>
  );
}

export default LoginPage;
