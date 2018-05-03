var express = require('express');
var router = express.Router();
var Review = require('../models/review');

router.route('/reviews')
    .get(function(req, res) {
        Review.find(function(err, reviews) {
            if (err) {
                res.send(err);
            } else {
                res.json(reviews);
            }
        });
    })

    // create new review
    .post(function(req, res) {
        var review = new Review();

        review.user_id = req.user._id;
        review.package_id = req.body.package_id;
        review.description = req.body.description;

        review.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Review submitted!');
            }
        });
    });

router.route('/reviews/:review_id')
    // get a review by id
    .get(function(req, res) {
        Review.findById(req.params.review_id, function(err, review) {
            if (err) {
                res.send(err);
            } else {
                res.json(review);
            }
        });
    })

    // edit update review
    .put(function(req, res) {

        review.user_id = req.user._id;
        review.package_id = req.body.package_id;
        review.description = req.body.description;
        review.updated_at = Date.now();

        review.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Review updated!');
            }
        });
    })

    // delete review
    .delete(function(req, res) {
        Review.remove({
            _id: req.params.review_id
        }, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Review deleted!');
            }
        });
    });

module.exports = router;
