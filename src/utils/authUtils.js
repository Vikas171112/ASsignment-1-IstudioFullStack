import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../configurations/serverConfig.js";

export const createTokenUtil = (payload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return token;
  } catch (error) {
    console.log("Error CReating Token");
    throw error;
  }
};
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log("Error verifying token:", error.message);
    throw error;
  }
};
