const express = require("express");
const app = express();
const morgan = require("morgan");

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
app.listen(port, console.log(`server is listening on port:${port}`));
