const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    database: 'members-only',
    port: 5432,
})

module.exports = pool;