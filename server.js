import express, { urlencoded } from "express";
import { PORT } from "./src/configurations/serverConfig.js";
import ConnectDB from "./src/configurations/databaseConfig.js";
import TaskRoutes from "./src/routes/TaskRoutes.js";
import UserRoutes from "./src/routes/UserRoutes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/task", TaskRoutes);
app.use("/user", UserRoutes);
app.get("/", (req, res) => {
  res.send("<h1>Hello, Geeks!</h1><p>This is your simple Express server.</p>");
});
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
  ConnectDB();
});
