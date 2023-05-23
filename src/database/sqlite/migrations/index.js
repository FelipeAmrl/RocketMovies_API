const sqliteConnection = require("../index");
const createUsersTable = require("./createUsers");

async function migrationsRun()
{
    const schemas = [
        createUsersTable
    ].join("");

    sqliteConnection()
        .then(db => db.exec(schemas))
        .catch(error => console.error(error));
}

module.exports = migrationsRun;