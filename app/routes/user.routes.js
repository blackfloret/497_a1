const express = require("express");
const {
	HomePage,
	LoginPage,
	registerPage,
	Logout,
} = require("../controllers/users.controllers");
const passport = require("passport");

const router = express.Router();

const bodyParser = require('body-parser');
const ejs = require('ejs');
const { body, validationResult } = require('express-validator');

const checkAuth = require('../middleware/checkAuth.middleware');
const userControllers = require('../controllers/users.controllers');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('public'));


router.post('/logout', userControllers.userLogout);

router.route('/login').post(
	passport.authenticate("local", {
		failureRedirect: "/",
		successRedirect: "/post",
	}),
	function (req, res) {}
)

/* router.post('/login', checkAuth.authenticateUserMiddleware, function(req, res) {
	res.redirect('/post/');
}); */

router.get('/login', function(req, res) {
	res.render('login');
});

router.get('/register', function(req, res) {
	res.render('register', {
		title: 'Register'
	});
});

/* router.post("/register", function(req, res) {
	userControllers.Signup;
}) */

//route("/register").post(Signup);

router.post(
	'/register',
	body('username', 'Username field cannot be empty.').notEmpty(),
	body('username', 'Username must be between 5-15 characters long.').isLength({ min: 5, max: 15 }),
	body('passwordMatch', 'Passwords do not match, please enter matching passwords.').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password');
		}
		// Indicates the success of this synchronous custom validator
		return true;
	}),
    userControllers.userRegister
);

module.exports = router