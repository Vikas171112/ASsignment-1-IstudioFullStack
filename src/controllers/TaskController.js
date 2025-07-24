import { StatusCodes } from "http-status-codes";
import {
  createTaskService,
  deleteTaskService,
  getAllTaskService,
  updateTaskService,
} from "../services/TaskService.js";
import {
  customErrorResponse,
  successResponse,
} from "../utils/responseObjects.js";
import { response } from "express";

export const createTaskController = async (req, res) => {
  try {
    const response = await createTaskService({ ...req.body });
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
export const updateTaskController = async (id, taskObj) => {
  try {
    const { id } = req.params();
    const { taskObj } = req.body;
    response = await updateTaskController(id, taskObj);
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
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
