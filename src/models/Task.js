import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "New Task",
    },
    description: {
      type: String,
      default: "Some Status",
    },
    status: {
      type: String, // Enum ke liye Boolean nahi
      enum: ["isPending", "inProgress", "isCompleted"], // Allowed values
      default: "isPending", // Aap chahein toh default value de sakte hain
    },
    dueDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
