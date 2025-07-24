import { StatusCodes } from "http-status-codes";
import { customErrorResponse } from "../utils/responseObjects.js";
import { verifyToken } from "../utils/authUtils.js";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: "Token is Required",
        })
      );
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: "Invalid data sent from the client",
          message: "Invalid auth token provided",
        })
      );
    }
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Auth middleware error", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: "Invalid data sent from the client",
          message: "Invalid auth token provided",
        })
      );
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
