const socketServerIo = require("./src/app.js");
const { conn } = require("./src/db.js");
const { saveAllGamesInDb } = require("./src/controllers/GamesController");
let PORT = process.env.PORT;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  socketServerIo.listen(PORT, () => {
    saveAllGamesInDb();
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
