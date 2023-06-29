const express = require("express");
const app = express();
const morgan = require("morgan");
const { connectDB } = require("./db/connect");
require("dotenv").config();

/*****************************  file imports  *****************************/
const tasksRoute = require("./routes/task.routes");

/*****************************  constants  *****************************/
const port = 3000;

/*****************************  middleware  *****************************/
app.use(morgan("tiny"));
app.use(express.json());

/*****************************  routes  *****************************/
app.use("/api/v1/tasks", tasksRoute);

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
