const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// CREATE a comment
router.post('/:id', (req, res) => {
    Comment.create({
        user_id: req.session.user_id,
        post_id: req.params.id,
        text: req.body.text
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;