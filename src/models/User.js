import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import Task from "./Task.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next(); // agar password nahi badla toh dobara hash nahi karna
  }

  const SALT = await bcrypt.genSalt(9);
  const hashedPassword = await bcrypt.hash(user.password, SALT);
  user.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
