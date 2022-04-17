const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require("../../utils/auth");

// /api/posts

// GET all posts
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: ['id', 'title', 'text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'user_id', 'text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET one post
router.get('/:id', (req, res) => {
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
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE a post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        text: req.body.text,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE a post
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData[0]) {
            res.status(404).json({ message: "No post found with that ID." });
            return;
        }
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: "No post found with that ID." });
            return;
        }
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;