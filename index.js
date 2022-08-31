const socketServerIo = require("./src/app.js");
const { conn } = require("./src/db.js");
const { saveAllGamesInDb } = require("./src/controllers/GamesController");
const { saveAllGenresInDb } = require("./src/controllers/GenreController");
let PORT = process.env.PORT;

// Syncing all the models at once.
conn.sync().then(() => {
  socketServerIo.listen(PORT, () => {
    saveAllGenresInDb();
    saveAllGamesInDb();
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
