const router = require('express').Router();

router.get('/', (req, res) => {
    console.log("Connected");
    res.render('homepage');
});

module.exports = router;