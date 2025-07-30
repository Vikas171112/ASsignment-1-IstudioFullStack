"use client";

import { Badge } from "@/components/ui/badge";
import { useUpdateTaskStatusHook } from "@/hooks/TaskHooks/useUpdateTasService";
import { getTaskStatus } from "@/utils/getTaskStatus";
import { format } from "date-fns";
import { Plus, Pencil, Trash } from "lucide-react"; // Added icons
import { Button } from "@/components/ui/button";

export default function TaskTable({ tasks = [] }) {
  const { mutateAsync: updateStatus, isPending } = useUpdateTaskStatusHook();

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

  const handleDeleteTask = (task) => {
    console.log("Delete clicked", task);
    // TODO: Show confirm dialog, then delete
  };

  return (
    <table className="min-w-full border border-gray-200 shadow-sm rounded-md overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left px-6 py-3 font-semibold text-gray-700">
            Title
          </th>
          <th className="text-left px-6 py-3 font-semibold text-gray-700">
            Status
          </th>
          <th className="text-left px-6 py-3 font-semibold text-gray-700">
            Due Date
          </th>
          <th className="text-left px-6 py-3 font-semibold text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {tasks.map((task) => (
          <tr
            key={task._id}
            className="border-t hover:bg-gray-50 transition-colors"
          >
            <td className="px-6 py-4 text-sm">{task.title}</td>
            <td className="px-6 py-4">
              <Badge variant="outline" className="capitalize px-2 py-1 text-xs">
                {getTaskStatus(task.status)}
              </Badge>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {task.dueDate
                ? format(new Date(task.dueDate), "dd MMM yyyy")
                : "-"}
            </td>
            <td className="px-6 py-4">
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
                    className="hover:bg-gray-100 rounded-full"
                    title="Mark In Progress"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </Button>
                )}

                {/* Edit Icon */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEditTask(task)}
                  className="hover:bg-gray-100 rounded-full"
                  title="Edit Task"
                >
                  <Pencil className="w-4 h-4 text-gray-700" />
                </Button>

                {/* Delete Icon */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteTask(task)}
                  className="hover:bg-gray-100 rounded-full"
                  title="Delete Task"
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
