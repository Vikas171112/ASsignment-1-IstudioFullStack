import express from "express";
import { PORT } from "./src/configurations/serverConfig.js";
import ConnectDB from "./src/configurations/databaseConfig.js";
const app = express();
app.get("/", (req, res) => {
  res.send("<h1>Hello, Geeks!</h1><p>This is your simple Express server.</p>");
});
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
  ConnectDB();
});
