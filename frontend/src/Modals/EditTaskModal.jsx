"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTaskEditContext } from "@/hooks/Contexts/useTaskEditContext";
import { useState, useEffect } from "react";
import { useUpdateTaskData } from "@/hooks/TaskHooks/useUpdateTaskUpdateSErvice";

export default function EditTaskModal() {
  const { open, closeEditModal, taskToEdit } = useTaskEditContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { updateData, isPending } = useUpdateTaskData();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setDueDate(taskToEdit.dueDate?.slice(0, 10) || "");
    }
  }, [taskToEdit]);

  if (!taskToEdit) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateData({
        taskId: taskToEdit._id,
        title,
        description,
        dueDate,
      });
      closeEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-4">
          <Input
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            required
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
