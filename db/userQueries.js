const pool = require('./pool');

exports.addUser = async (username, firstName, lastName, password) => {
    await pool.query("INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4)", [username, firstName, lastName, password])
}

exports.checkUser = async (username) => {
    const {rows} = await pool.query("SELECT COUNT(username) FROM users WHERE username = $1", [username]);
    const {count} = rows[0];
    return count;
}

exports.invokeMembership = async (id) => {
    await pool.query("UPDATE users SET member_status = true WHERE id = $1", [id])
}

