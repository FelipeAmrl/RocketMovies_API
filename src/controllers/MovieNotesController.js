const AppError = require("../utils/AppError");
const knexConnection = require("../database/knex");

class MovieNotesController
{
    async create(request, response)
    {
        const { title, description, rating, tags } = request.body;
        const user_id = request.user.id;

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

    async delete(request, response)
    {
        const { id } = request.params;

        await knexConnection("movie_notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response)
    {
        const { title } = request.query;
        const user_id = request.user.id;
 
        const movieNotes = await knexConnection("movie_notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        

        const userTags = await knexConnection("movie_tags").where({ user_id });

        const movieNotesWithTags = movieNotes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            };
        });

        return response.json(movieNotesWithTags);
    }
}

module.exports = MovieNotesController;
