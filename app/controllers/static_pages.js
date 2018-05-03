var express = require('express');
var router = express.Router();

router.route('/')
    // get homepage
    .get(function(req, res) {
        res.json('Welcome to home page!')
    });

// Error page
router.route('/error')
    .get(function(req, res) {
        res.json('Opps!!! Error!Try again!');
    });

    // Error page
    router.route('/help')
        .get(function(req, res) {
            res.json('This is a help page');
        });

        // Error page
        router.route('/about')
            .get(function(req, res) {
                res.json('This is about us page');
            });

module.exports = router;
