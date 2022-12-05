const { Post } = require("../models/post");
const Redis = require("ioredis");
const Cache = require("ioredis-cache");
const cache = new Cache(new Redis("blogcluster.ntwtkd.ng.0001.usw2.cache.amazonaws.com"));

const homeStartingContent =
	'The home pages lists all the blogs from all the users.';

const composePost = async (req, res) => {
	const post = await Post.create({
    username: req.user.username,
		title: req.body.postTitle,
		content: req.body.postBody
	});

	res.redirect('/post');
};

const displayAllPosts = async (req, res) => {
	const posts = await Post.findAll();
	res.render('home', {
		startingContent: homeStartingContent,
		posts: posts
	});
/* 	Post.find({}, function(err, posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts
		});
	}); */
};
async function displayPost (req, res)  {
	const requestedPostId = req.params.postId;
	//const post = await Post.findOne({where: { id: requestedPostId}});
	console.log(await cache.getCache(requestedPostId));
	const post = await cache.cache(requestedPostId, async () => await Post.findOne({where: { id: requestedPostId}}))
	res.render('post', {
		title: post.tile,
		content: post.content
	});
};

module.exports = {
	displayAllPosts,
	displayPost,
    composePost
};