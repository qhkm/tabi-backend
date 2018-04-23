var express = require('express');
var router = express.Router();

var Review = require('../models/review');
var Package = require('../models/package');

router.route('/packages/:package_id/reviews')
// create new review
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

router.route('/packages/:package_id/reviews/:review_id')
// get a review by id
	.get(function(req, res){

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
