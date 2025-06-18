const pool = require('./pool');

async function addUser(username, firstName, lastName, password, status){
    await pool.query("INSERT INTO users (username, first_name, last_name, password, member_status) VALUES ($1, $2, $3, $4, $5)", [username, firstName, lastName, password, status])
}

async function getAllMessages(){
    const { rows } = await pool.query("SELECT * FROM messages"); 
    return rows;
}

module.exports = {
    addUser,
    getAllMessages,
}