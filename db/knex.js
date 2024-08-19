const knex = require('knex');

const connectexKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "db.sqlite3"
    }
});

module.exports = connectexKnex;