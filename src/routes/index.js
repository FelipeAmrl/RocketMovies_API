const { Router } = require("express");

const usersRouter = require("./user.routes");
const movieNotesRouter = require("./movieNotes.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movie_notes", movieNotesRouter);

module.exports = routes;