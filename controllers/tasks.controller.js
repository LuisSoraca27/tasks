const { Tasks } = require("../models/tasks.model");
const { User } = require("../models/user.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      where: { status: "active" },
      include: User,
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await Tasks.findAll({
      where: { status },
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createTasks = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;

    const newTask = await Tasks.create({ title, userId, startDate, limitDate });

    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTasks = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task } = req;

    const limitDate = new Date(task.limitDate); // "date js"

    const dateFinish = new Date(finishDate); // "a"

    if (dateFinish >= limitDate) {
      await task.update({ finishDate, status: "late" });
    } else {
      await task.update({ finishDate, status: "completed" });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { task } = req;

    await task.update({ status: "cancelled" });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTasks,
  deleteTasks,
  getAllTasks,
  getTasksByStatus,
  updateTasks,
};
