const pool = require('./pool');

exports.addUser = async (username, firstName, lastName, password) => {
    await pool.query("INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4)", [username, firstName, lastName, password])
}

exports.invokeMembership = async (id) => {
    await pool.query("ALTER TABLE users ALTER COLUMN member_status = true WHERE id = $1", [id])
}
