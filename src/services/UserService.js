import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/UserRepo.js";
import { createTokenUtil } from "../utils/authUtils.js";
import ClientError from "../utils/clientError.js";
import ValidationError from "../utils/validationError.js";
import bcrypt from "bcryptjs";

export const signupUserService = async (userObj) => {
  try {
    const newUser = await userRepository.create(userObj);
    return newUser;
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new ValidationError(error.errors, error.message);
    }

    if (
      (error.name === "MongoServerError" || error.name === "MongoError") &&
      error.code === 11000
    ) {
      const field = error.keyValue ? Object.keys(error.keyValue)[0] : "field";
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists`;

      // Pass a valid error object to ValidationError constructor
      throw new ValidationError({ [field]: message }, "Duplicate Field Error");
    }
  }
};

export const signinUserService = async (userObj) => {
  console.log(userObj, "service");
  try {
    const user = await userRepository.getByEmail(userObj.email);
    if (!user) {
      throw new ClientError({
        explanation: "Invalid data sent from the client",
        message: "No registered user found with this email",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    const isMatch = bcrypt.compareSync(userObj.password, user.password);
    if (!isMatch) {
      throw new ClientError({
        explanation: "Invalid data sent from the client",
        message: "Invalid password, please try again",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    return {
      email: user.email,
      _id: user._id,
      token: createTokenUtil({ id: user._id, email: user.email }),
    };
  } catch (error) {
    console.log("User service error", error);
    throw error;
  }
};
export const getUserByIdService = async (id) => {
  try {
    console.log(id, "Service");
    const user = await userRepository.getById(id);

    return user;
  } catch (error) {
    console.log("User get Service Error", error);
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
