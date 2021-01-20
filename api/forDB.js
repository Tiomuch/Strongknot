module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    /*password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME*/
  },
});
