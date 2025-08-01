import { StatusCodes } from "http-status-codes";
import TaskRepo from "../repositories/TaskRepo.js";
import ClientError from "../utils/clientError.js";
import userRepository from "../repositories/UserRepo.js";

export const createTaskService = async (taskObject) => {
  try {
    const newTask = await TaskRepo.create(taskObject);
    return newTask;
  } catch (error) {
    console.log("Task service error", error);
    if (error.name === "ValidationError") {
      throw new ValidationError(
        {
          error: error.errors,
        },
        error.message
      );
    }
  }
};
export const getAllTaskService = async () => {
  try {
    const allTasks = await TaskRepo.getAll();
    return allTasks;
  } catch (error) {
    console.log("Task service Error", error);
    throw error;
  }
};
export const getTaskByIdService = async (id) => {
  try {
    const task = await TaskRepo.getById(id);
    return task;
  } catch (error) {
    throw new ClientError({
      explanation: "Invalid Data Sent From Client",
      message: "Task Not found",
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
};
export const updateTaskService = async (id, taskObj) => {
  try {
    const task = await getTaskById(id);
    if (!task) {
      throw new ClientError({
        explanation: "Task with given ID does not exist",
        message: "Task Not Found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    const updatedTask = await TaskRepo.update(id, taskObj);
    return updatedTask;
  } catch (error) {
    console.log("Update Task Service error", error);
    throw error;
  }
};
export const deleteTaskService = async (id) => {
  try {
    const task = await getTaskById(id);
    if (!task) {
      throw new ClientError({
        explanation: "Task with given ID does not exist",
        message: "Task Not Found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    const deletedTask = await TaskRepo.delete(id);
    return deletedTask;
  } catch (error) {
    throw error;
  }
};
