import dotenv from "dotenv";
dotenv.config();
export const DEV_DB_URL = process.env.DEV_DB_URL;
export const PROD_DB_URL = process.env.PROD_DB_URL;
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
