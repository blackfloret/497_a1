const client = require('./database.js');
const bcrypt = require("bcryptjs");

const emailExists = async (email) => {
    const data = await client.query("SELECT * FROM users WHERE email=$1", [email, ]);

    if (data.rowCount == 0) return false;
    return data.rows[0];
}

const usernameExists = async (username) => {
    const data = await client.query("SELECT * from users WHERE username=$1", [username, ]);

    if (data.rowCount == 0) return false;
    return data.rows[0];
}

const createUser = async (username, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(username + email + password);
    const data = await client.query(
        "INSERT INTO users(username, email, password) VALUES ($1, $2, $3)",
        [username, email, hash]
    );

    if (data.rowCount == 0) return false;
        return data.rows[0];
}

const matchPassword = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match
};

module.exports = { emailExists, createUser, matchPassword, usernameExists };