require('dotenv').config();
const express = require('express');
const config = require('./config/config');
const compression = require ('compression');
const helmet = require('helmet');
const https= require("https");
const fs = require('fs')
const Redis = require("ioredis");

const { passportConfig } = require("passport");


const session = require('express-session');
const connectRedis = require("connect-redis");
const { createClient } = require("redis");
const passport = require("passport");

const bodyParser = require('body-parser');


const User = require("./models/user");

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const { hostname } = require('os');


const app = express();

app.set('view engine', 'ejs');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(express.static('public'));

// Redis config
const redis = new Redis("blogcluster.ntwtkd.ng.0001.usw2.cache.amazonaws.com");
/* const redisClient = createClient({ 
	legacyMode: true,
	socket: {
		host: "blogcluster.ntwtkd.ng.0001.usw2.cache.amazonaws.com",
		port: 6379
	} 
});
redisClient.connect().catch(console.error); */
const RedisStore = connectRedis(session);

// Session middleware


  
app.set('trust proxy', 1); // trust first proxy

const port = config.get('port') || 3000;
/* const blogDB = config.get('db.name')

const blog_db_url =
	config.get('db.db_url') +
	config.get('db.password') +
	config.get('db.host') +
	blogDB +
	'?retryWrites=true&w=majority';

const dbConnection = mongoose.connect(blog_db_url, (err) => {
  if(err){
    console.log(err)
  }
}); */

app.use(
	session({
	  store: new RedisStore({ client: redis }),
	  secret: "secret",
	  resave: false,
	  saveUninitialized: false,
	  cookie: {
		secure: false,  // if true only transmit cookie over https
		httpOnly: false, // if true prevent client side JS from reading the cookie
		maxAge: 1000 * 60 * 10, // session max age in milliseconds
	  },
	})
   );



app.use(passport.initialize());
app.use(passport.session());

/* passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
}); */

app.use(function(req, res, next) {
	res.locals.isAuthenticated=req.isAuthenticated();
	next();
});

app.use('/user', userRouter);

app.use('/post', postRouter);

app.all('*', function(req, res) {
  res.redirect("/post/about");
});

/* const server = https.createServer({
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.cert')
}, app).listen(port,() => {
console.log('Listening ...Server started on port ' + port);
}) */

passportConfig();


app.listen(4300, () => {
	console.log(`Server started at port ${4300}`);
});


module.exports = app;