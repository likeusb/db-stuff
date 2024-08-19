const knex = require('./knex');

function getAll() {
    return knex('products').select('*');
};

module.exports = {
    getAll
};