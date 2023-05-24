const knexConnection = require("../database/knex");

class MovieTagsController 
{
    async index(request, response)
    {
        const { user_id } = request.query;

        const movieTags = await knexConnection("movie_tags")
            .where({user_id});

        return response.json(movieTags);
    }
}

module.exports = MovieTagsController;