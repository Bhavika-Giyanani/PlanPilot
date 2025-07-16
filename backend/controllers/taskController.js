import Task from "../model/taskModel.js";

//^ Create
export const createTask = async (req, res) => {
  try {
    if (!req.body.title)
      return res.status(400).json({ message: "Task title is required." });
    const task = await Task.create({
      user: req.user.user_id,
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      status: req.body.status,
      priority: req.body.priority,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Task creation failed. " + error.message });
  }
};

//^ Read
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ message: "Failed to fetch tasks. " + e.message });
  }
};

//^ Update
export const updateTask = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "Task id is required." });
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: e.message });
  }
};

//^ Delete
export const DeleteTask = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "Task id is required." });
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not Found." });
    }
    res.status(200).json({ message: "Task Deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete task. " + e.message });
  }
};
