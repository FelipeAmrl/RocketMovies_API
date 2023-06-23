const { Router } = require("express");

const usersRouter = require("./user.routes");
const movieNotesRouter = require("./movieNotes.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movie_notes", movieNotesRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;