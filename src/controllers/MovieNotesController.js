const AppError = require("../utils/AppError");
const knexConnection = require("../database/knex");

class MovieNotesController
{
    async create(request, response)
    {
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        const [note_id] = await knexConnection("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        })

        const tagsInsert = tags.map(name => {
            return {
                name,
                note_id,
                user_id
            };
        });

        await knexConnection("movie_tags").insert(tagsInsert);
    }
}

module.exports = MovieNotesController;
