import { StatusCodes } from "http-status-codes";
import {
  getUserByIdService,
  signinUserService,
  signupUserService,
} from "../services/UserService.js";
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse,
} from "../utils/responseObjects.js";

export const signupUserController = async (req, res) => {
  try {
    const userObj = req.body;

    console.log(userObj);
    const response = await signupUserService(userObj);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, "User Signed Up successfully"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
export const siginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const userObj = { email, password };
    console.log(userObj, "controller");
    const response = await signinUserService(userObj);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "User Signed In Successfully"));
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
export const getUserByIdController = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await getUserByIdService(req.params.id);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(user, "User Fetched succesfully"));
  } catch (error) {
    console.log(error);
  }
};
