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
import { response } from "express";
import userRepository from "../repositories/UserRepo.js";
import { getUserByIdService } from "../services/UserService.js";

export const createTaskController = async (req, res) => {
  try {
    const taskObj = { ...req.body };
    const response = await createTaskService(taskObj);
    const user = await getUserByIdService(req.user?.id);
    user.tasks.push(response._id);
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
