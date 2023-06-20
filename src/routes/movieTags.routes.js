const { Router } = require("express");

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const MovieTagsController = require("../controllers/MovieTagsController");

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.get("/", ensureAuthenticated, movieTagsController.index);

module.exports = movieTagsRoutes;