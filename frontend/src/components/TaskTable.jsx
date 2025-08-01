"use client";

import { Badge } from "@/components/ui/badge";
import { useUpdateTaskStatusHook } from "@/hooks/TaskHooks/useUpdateTasService";
import { getTaskStatus } from "@/utils/getTaskStatus";
import { format } from "date-fns";
import { Plus, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskEditContext } from "@/hooks/Contexts/useTaskEditContext";
import { useDeleteTaskHook } from "@/hooks/TaskHooks/useDeleteTaskService";

export default function TaskTable({ tasks = [] }) {
  const { mutateAsync: updateStatus, isPending } = useUpdateTaskStatusHook();
  const { openEditModal, closeEditModal } = useTaskEditContext();
  const { deleteTask, isPending: isDeleting } = useDeleteTaskHook();

  const handleStatusToggle = async (task) => {
    const newStatus =
      task.status === "isCompleted" ? "isPending" : "isCompleted";

    try {
      await updateStatus({ taskId: task._id, newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetInProgress = async (task) => {
    try {
      await updateStatus({ taskId: task._id, newStatus: "inProgress" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = (task) => {
    console.log("Edit clicked", task);
    // TODO: Open edit modal here
  };

  const handleDeleteTask = async (task) => {
    console.log("Delete clicked", task);
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await deleteTask(task._id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {tasks.map((task, idx) => (
            <tr
              key={task._id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                {task.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  variant="outline"
                  className="capitalize px-2 py-1 text-xs"
                >
                  {getTaskStatus(task.status)}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {task.dueDate
                  ? format(new Date(task.dueDate), "dd MMM yyyy")
                  : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.status === "isCompleted"}
                    onChange={() => handleStatusToggle(task)}
                    disabled={isPending}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />

                  {task.status !== "inProgress" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleSetInProgress(task)}
                      disabled={isPending}
                      className="hover:bg-blue-50 rounded-full"
                      title="Mark In Progress"
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEditModal(task)}
                    className="hover:bg-yellow-50 rounded-full"
                    title="Edit Task"
                  >
                    <Pencil className="w-4 h-4 text-yellow-600" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteTask(task)}
                    disabled={isDeleting}
                    className="hover:bg-red-50 rounded-full"
                    title="Delete Task"
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
