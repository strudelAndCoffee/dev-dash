const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// displays homepage.handlebars with all posts
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: ['id', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'text'],
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
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// displays login.handlebars
router.get('/login', (req, res) => {
    res.render('login');
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
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'user_id', 'text'],
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

        const post = postData.get({ plain: true })
        res.render('single-post', {
            post
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;