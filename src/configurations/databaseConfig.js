import mongoose from "mongoose";
import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

export default async function ConnectDB() {
  try {
    if (NODE_ENV === "development") {
      await mongoose.connect(DEV_DB_URL);
    } else if (NODE_ENV === "production") {
      await mongoose.connect(PROD_DB_URL);
    }
    console.log(`Database connected with ${NODE_ENV}`);
  } catch (error) {
    console.log("Error Connecting to Databse:", error);
    throw error;
  }
}
