const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize ({
	host: "blogdb.cjefnmgsr53w.us-west-2.rds.amazonaws.com",
	database: "BlogDB",
	username: "admin",
	password: "password",
	dialect: "mysql",
})

exports.User = sequelize.define("users", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
	},
	username: {
		type: DataTypes.STRING,
	},
	password: {
		type: DataTypes.STRING,
	},
})


/* const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		required: [ true, "can't be blank" ],
		match: [ /^[a-zA-Z0-9]+$/, 'Invalid username' ],
		unique: true,
		index: true
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [ true, "can't be blank" ],
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email' ],
		index: true
	}
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", userSchema); */