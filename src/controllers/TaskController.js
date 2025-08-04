import { StatusCodes } from "http-status-codes";
import {
  createTaskService,
  deleteTaskService,
  getAllTaskService,
  getTaskByIdService,
  updateTaskService,
} from "../services/TaskService.js";
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse,
} from "../utils/responseObjects.js";

import { getUserByIdService } from "../services/UserService.js";
import userRepository from "../repositories/UserRepo.js";

export const createTaskController = async (req, res) => {
  try {
    const taskObj = { ...req.body };
    const response = await createTaskService(taskObj);
    const user = await getUserByIdService(req.user?.id);
    user.tasks.push(response);
    user.save();
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, "Task created Successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
export const getAllTaskController = async (req, res) => {
  try {
    const response = await getAllTaskService();
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Task Fetched Successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Valid id of Task",
      });
    }
    const response = await getTaskByIdService(id);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Task is fetched "));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const taskObj = req.body;

    const response = await updateTaskService(id, taskObj);
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Task updated Successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteTaskService(id);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Task DEleted Successfully"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
export const getUserTasksController = async (req, res) => {
  try {
    console.log("sddas", req.user.id);
    const user = await userRepository.getTasksByUser(req.user.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Sirf tasks bhej raha hoon
    return res.status(200).json({ tasks: user.tasks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
