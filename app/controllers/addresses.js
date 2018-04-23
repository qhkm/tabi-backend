var express = require('express');
var router = express.Router();
var Address = require('../models/address');

router.route('/addresses')
	// get all addresses
	.get(function(req, res){
		Address.find(function(err, addresses){
			if(err){
				res.send(err);
			}else{
				res.json(addresses);
			}
		});
	});

module.exports = router;
