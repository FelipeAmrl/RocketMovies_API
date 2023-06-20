const { Router } = require("express");

const usersRouter = require("./user.routes");
const movieNotesRouter = require("./movieNotes.routes");
const movieTagsRouter = require("./movieTags.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movie_notes", movieNotesRouter);
routes.use("/movie_tags", movieTagsRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;