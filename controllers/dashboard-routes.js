const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require("../utils/auth");

// render dashboard.handlebars
router.get('/', withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', {
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

// render create-post.handlebars
router.get('/create', withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('create-post', {
        loggedIn: req.session.loggedIn,
        username: req.session.username
    });
});

// render edit-post.handlebars
router.get('/edit/:id', withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('edit-post');
});

module.exports = router;