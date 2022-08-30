const socketServerIo = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
const { saveAllGamesInDb } = require("./src/controllers/GamesController");

let port = PORT || 3001;
// Syncing all the models at once.
conn.sync().then(() => {
  socketServerIo.listen(PORT, () => {
    saveAllGamesInDb();
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
