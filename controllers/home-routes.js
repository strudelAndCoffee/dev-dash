const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// displays homepage.handlebars with all posts
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: ['id', 'title', 'text', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'text'],
                order: [['created_at', 'DESC']],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// displays login.handlebars
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// displays signup.handlebars
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// displays single-post.handlebars with matching id's post data data
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Comment,
                attributes: ['id', 'user_id', 'text', 'created_at'],
                order: [['created_at', 'DESC']],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: "No post found with that ID." });
            return;
        }

        const post = postData.get({ plain: true });
        let isCurrentUser = false;

        if (req.session.user_id == post.user.id) {
            isCurrentUser = true;
        }

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            currentUser: isCurrentUser
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;