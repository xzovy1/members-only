const pool = require('./pool');

exports.getAllMessages = async () => {
    const { rows } = await pool.query("SELECT title, body, date_time, username, first_name, last_name, messages.id FROM messages LEFT JOIN users ON users.id = messages.fk_users ORDER BY date_time DESC"); 
    return rows;
}

exports.addNewMessage = async (title, body, userId) => {
    await pool.query("INSERT INTO messages (title, body, fk_users) VALUES ($1, $2, (SELECT id FROM users WHERE id = $3))", [title, body, userId]);
}

exports.deleteMessage = async (id) => {
    await pool.query("DELETE FROM messages WHERE messages.id = $1", [id])
}