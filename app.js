const express = require("express");
const app = express();
const morgan = require("morgan");
const { connectDB } = require("./db/connect");
require("dotenv").config();

/*****************************  file imports  *****************************/
const tasksRoute = require("./routes/task.routes");
const { notFoundPage } = require("./middleware/404");
const errorHandlerMiddleware = require("./middleware/errorHandler");

/*****************************  constants  *****************************/
const port = process.env.PORT || 3000;

/*****************************  middleware  *****************************/
app.use(morgan("tiny"));
app.use(express.static("./public"));
app.use(express.json());

/*****************************  routes  *****************************/
app.use("/api/v1/tasks", tasksRoute);
app.use(notFoundPage);
app.use(errorHandlerMiddleware);

/*****************************  listeners  *****************************/
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port:${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
