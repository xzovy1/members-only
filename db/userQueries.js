const pool = require('./pool');

exports.addUser = async (username, firstName, lastName, password, status) => {
    await pool.query("INSERT INTO users (username, first_name, last_name, password, member_status) VALUES ($1, $2, $3, $4, $5)", [username, firstName, lastName, password, status])
}
