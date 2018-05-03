var express = require('express');
var router = express.Router();

var Review = require('../models/review');
var Package = require('../models/package');

// create new review
router.route('/packages/:package_id/reviews')
	.post(function(req, res){
		Package.findById(req.params.package_id, function(err, package){
			if(err){
				res.send(err);
			}else{
				var review = new Review();

				review.user_id = req.user;
				review.package_id = req.params.package_id;
				review.description = req.body.description;

				review.save(function(err){
					if(err){
						res.send(err);
					}else{
						res.json('Review submitted!');
					}
				});
			}
		});
	});

	// edit update review
router.route('/users/:user_id/packages/:package_id/reviews/:review_id')
.post(function(req, res){
	Review.findById(req.params.review_id, function(err, review){
		if(err){
			res.send(err);
		}else{
			review.user_id = req.params.user_id;
			review.package_id = req.params.package_id;
			review.description = req.body.description;
			review.updated_at = Date.now();

			review.save(function(err){
				if(err){
					res.send(err);
				}else{
					res.json('Review updated!');
				}
			});
		}
	});
});

// get a review by id
router.route('/reviews/:review_id')
	.get(function(req, res){
		Review.findById(req.params.review_id, function(err, review){
			if(err){
				res.send(err);
			}else{
				res.json(review);
			}
		});
	});

router.route('/reviews/:review_id')
// delete review
.delete(function(req, res){
	Review.remove({ _id: req.params.review_id}, function(err){
		if(err){
			res.send(err);
		}else{
			res.json('Review deleted!');
		}
	});
});

module.exports = router;
