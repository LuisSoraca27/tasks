const express = require("express");


// middlewares
const { statusExists,taskExist } = require('../middlewares/tasks.middlewares')

// controllers
const {
  createTasks,
  deleteTasks,
  getAllTasks,
  getTasksByStatus,
  updateTasks
} = require("../controllers/tasks.controller");


const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks)

tasksRouter.get('/:status', statusExists, getTasksByStatus)

tasksRouter.post('/',createTasks)

tasksRouter.patch('/:id', taskExist, updateTasks )

tasksRouter.delete('/:id', taskExist, deleteTasks)

module.exports = {
    tasksRouter
}