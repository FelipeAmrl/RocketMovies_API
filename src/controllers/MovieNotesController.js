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

        return response.json();
    }

    async show(request, response)
    {
        const { id } = request.params;

        const movieNote = await knexConnection("movie_notes").where({id}).first();
        const tags = await knexConnection("movie_tags").where({note_id: id}).orderBy("name");

        return response.json({
            ...movieNote,
            tags
        });
    }
}

module.exports = MovieNotesController;
