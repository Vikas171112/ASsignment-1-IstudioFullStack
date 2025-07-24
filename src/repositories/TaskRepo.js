import Task from "../models/Task.js";
import crudRepository from "./crudRepository.js";
const taskRepository = {
  ...crudRepository(Task),
};

export default taskRepository;
