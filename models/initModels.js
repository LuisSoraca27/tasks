const { Tasks } = require("../models/tasks.model");
const { User } = require("../models/user.model");

const initModels = () => {
  User.hasMany(Tasks, { foreignKey: "userId" });
  Tasks.belongsTo(User);
};

module.exports = { initModels };
