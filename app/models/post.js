const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize ({
	host: "blogdb.cjefnmgsr53w.us-west-2.rds.amazonaws.com",
	database: "BlogDB",
	username: "admin",
	password: "password",
	dialect: "mysql",
})

exports.Post = sequelize.define("posts", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	username: {
		type: DataTypes.STRING,
	},
	title: {
		type: DataTypes.STRING,
	},
	content: {
		type: DataTypes.STRING,
	},
})


/* const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		required: [ true, "can't be blank" ],
		match: [ /^[a-zA-Z0-9]+$/, 'Invalid username' ],
		index: true,
		unique: true
	},
	title: { type: String, required: [ true, "can't be blank" ] },
	content: { type: String, required: [ true, "can't be blank" ] }
});

module.exports = mongoose.model("Post", postSchema); */