const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
const { saveAllGamesInDb } = require("./src/controllers/GamesController");

let port = PORT || 3001;
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    saveAllGamesInDb();
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
