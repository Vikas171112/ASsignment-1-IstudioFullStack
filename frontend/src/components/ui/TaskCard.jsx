import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import TaskTable from "../TaskTable";
import { useFetchByIdHook } from "@/hooks/useFetchUserByidhook";
import { useAuthContext } from "@/hooks/Contexts/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { getTasksByUser } from "@/services/UserServices/TaskServices/getTasksByUserService";

function TaskCard() {
  const { userData } = useFetchByIdHook();
  const { user } = useAuthContext();
  console.log(user);

  const userId = user?.id;
  const { data, isLoading } = useQuery({
    queryKey: ["userTasks"],
    queryFn: getTasksByUser,
  });
  console.log("data:", data);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <TaskTable tasks={data?.tasks || []} />
          )}
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TaskCard;
