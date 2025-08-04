"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useUpdateTaskStatusHook } from "@/hooks/TaskHooks/useUpdateTasService";
import { getTaskStatus } from "@/utils/getTaskStatus";
import { format } from "date-fns";
import { Plus, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskEditContext } from "@/hooks/Contexts/useTaskEditContext";
import { useDeleteTaskHook } from "@/hooks/TaskHooks/useDeleteTaskService";
import SortingDropDown from "./SortingDropDown";
import { SearchInput } from "./SearchInput";

export default function TaskTable({ tasks = [] }) {
  const { mutateAsync: updateStatus, isPending } = useUpdateTaskStatusHook();
  const { openEditModal } = useTaskEditContext();
  const { deleteTask, isPending: isDeleting } = useDeleteTaskHook();

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleDeleteTask = async (task) => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await deleteTask(task._id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" ? true : task.status === statusFilter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 flex-wrap">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "isPending" ? "default" : "outline"}
            onClick={() => setStatusFilter("isPending")}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "isCompleted" ? "default" : "outline"}
            onClick={() => setStatusFilter("isCompleted")}
          >
            Completed
          </Button>
          <Button
            variant={statusFilter === "inProgress" ? "default" : "outline"}
            onClick={() => setStatusFilter("inProgress")}
          >
            In Progress
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <SortingDropDown sortBy={sortBy} setSortBy={setSortBy} />
          <SearchInput
            type="text"
            placeholder="Search For Tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sortedTasks.map((task, idx) => (
              <tr
                key={task._id}
                className={`hover:bg-gray-50 ${
                  idx % 2 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-800 break-words">
                  {task.title}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge
                    variant="outline"
                    className="capitalize px-2 py-1 text-xs"
                  >
                    {getTaskStatus(task.status)}
                  </Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                  {task.dueDate
                    ? format(new Date(task.dueDate), "dd MMM yyyy")
                    : "-"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
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
    </div>
  );
}
