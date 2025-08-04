import User from "../models/User.js";
import crudRepository from "./crudRepository.js";

const userRepository = {
  ...crudRepository(User),
  getByEmail: async function (email) {
    const user = await User.findOne({ email });
    return user;
  },
  getTasksByUser: async function (id) {
    const user = await User.findById(id).populate({
      path: "tasks",
    });
    return user;
  },
};
export default userRepository;
