import express from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import { PORT } from "./utils/config";
import { connectDB } from "./database/db";

connectDB();

const app = express();
app.use(express.json());

app.use("/tasks", require("./routers/tasksRouter"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`));
