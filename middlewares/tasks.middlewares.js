const { Tasks } = require("../models/tasks.model");

const statusExists = async (req, res, next) => {
  try {
    const { status } = req.params;

    if (
      status == "active" ||
      status == "completed" ||
      status == "late" ||
      status == "canceled"
    ) {
      next();
    } else {
      res.status(404).json({
        status: "error",
        message: `${status} is not a valid status`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const taskExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = Tasks.findOne({ where: { id } });
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "task not found",
      });
    }
    res.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  statusExists,
  taskExist,
};
