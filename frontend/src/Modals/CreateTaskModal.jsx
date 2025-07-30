import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateTaskModalContext } from "@/hooks/Contexts/useCreateTaskContext";
import { useCreateTaskServiceHook } from "@/hooks/TaskHooks/usecreateTaskServiceHook";
import React, { useState } from "react";

function CreateTaskModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { openCreateTaskModal, setOpenCreateTaskModal } =
    useCreateTaskModalContext();
  const { isError, isPending, error, isSuccess, taskMutation } =
    useCreateTaskServiceHook();

  function handleTaskSubmission(e) {
    e.preventDefault();
    console.log("Task submitted", { title, description, dueDate });
    try {
      taskMutation({ title, description, dueDate });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Dialog open={openCreateTaskModal} onOpenChange={setOpenCreateTaskModal}>
        <DialogContent>
          <DialogHeader>Create New Task</DialogHeader>
          <form onSubmit={handleTaskSubmission}>
            <div className="flex flex-col gap-4">
              <Input
                required
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                required
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]} //  Minimum date = aaj ki date
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-5">
              <Button disabled={isPending}>
                {isPending ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTaskModal;
