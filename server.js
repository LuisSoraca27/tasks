const { app } = require("./app");
const { initModels } = require("./models/initModels");
const { db } = require("./utils/database.util");

const startServer = async () => {
  try {
    // database auntenticated
    await db.authenticate();

    //relations  modell
    initModels();

    // database synced
    await db.sync();

    // Set server to listen
    const PORT = 4000;

    app.listen(PORT, () => {
      console.log("Express app running!");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
