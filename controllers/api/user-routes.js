const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require("../../utils/auth");

// /api/users

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET one user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: "No user found with that ID." });
            return;
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE a user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json(userData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// LOGIN as user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: "No user found with that email." });
            return;
        }

        const validPw = userData.pwCheck(req.body.password);

        if (!validPw) {
            res.status(400).json({ message: "Incorrect password." });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({
                user: userData,
                message: "Log in success!"
            });
        });
    });
});

//LOGOUT as user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    } 
});

// UPDATE a user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: "No user found with that ID." });
            return;
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE a user
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: "No user found with that ID." });
            return;
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;