const User = require('../models/user');
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

    const userExists = await usernameExists(input_username);
    const emailExist = await emailExists (input_email);

    console.log(userExists);
    console.log(emailExist);

    if (userExists != false || emailExist != false) {
        console.log('User or email exists');
        res.redirect('register');
    } else {
        console.log(input_email, input_password, input_username);
        createUser(input_username, input_email, input_password);
        passport.authenticate('local')(req, res, function () {
            res.redirect('/post');
        });
    }
};

module.exports = {
    userRegister,
    userLogout
};
