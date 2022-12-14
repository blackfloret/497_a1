const { User } = require('../models/user');
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(12);

        const hashed_password = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hashed_password });
        if(user) {
            res.redirect('/post');
        }
    } catch(e) {
        res.redirect('/user/register');
    }
}

exports.HomePage = async (req, res) => {
    if (!req.user) {
      return res.redirect("/");
    }
    res.render("home", {
      sessionID: req.sessionID,
      sessionExpireTime: new Date(req.session.cookie.expires) - new Date(),
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
    });
   };
   
exports.LoginPage = async (req, res) => {
    res.direct("/user/login");
};

exports.registerPage = async (req, res) => {
    res.direct("/user/register");
};

exports.Logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/");
    })
}

const passport = require('passport');
const { usernameExists, createUser, emailExists } = require('../helper');
const { body, validationResult } = require('express-validator');



const userLogout = (req, res, next) => {
    console.log('logout processed');
    req.session.destroy();
    req.logout();
    res.redirect('/post/about');
};

const userRegister = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const input_username = req.body.username;
    const input_email = req.body.email;
    const input_password = req.body.password;


    console.log(input_username);

    const userExists = await User.findOne({ where: { username: input_username}});
    const emailExist = await User.findOne({ where: { email: input_email}});


    console.log(userExists);
    console.log(emailExist);

    if (userExists != null || emailExist != null) {
        console.log('User or email exists');
        res.redirect('register');
    } else {
        console.log(input_email, input_password, input_username);
        //newUser = new User({ email: req.body.email, username: req.body.username });
        const salt = await bcrypt.genSalt(12);

        const hashed_password = await bcrypt.hash(input_password, salt);

        const user = await User.create({ username: input_username, email: input_email, password: hashed_password });
        if(user) {
            res.redirect('/post');
        } else {
            res.redirect('/register');
        }
    }
};

module.exports = {
    Signup,
    userRegister,
    userLogout
};
