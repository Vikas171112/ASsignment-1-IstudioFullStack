import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

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
});
userSchema.pre("save", function saveUser(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashedPassword;
  next();
});
const User = mongoose.model("User", userSchema);
export default User;
