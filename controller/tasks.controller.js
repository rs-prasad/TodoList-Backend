const asyncWrapper = require("../middleware/async-wrapper");
const CustomAPIError = require("../errors/customAPIError");

const Task = require("../models/task");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(new CustomAPIError(`No task with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  // console.log(id, body);
  const task = await Task.findOneAndUpdate({ _id: id }, body, {
    new: true, // to get newly created object
    runValidators: true,
  });
  if (task) return res.status(200).json({ id, task });
  return next(new CustomAPIError(`No task with id ${taskId}`, 404));
});

const deleteTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(new CustomAPIError(`No task with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = { getAllTasks, getTask, updateTask, createTask, deleteTask };
