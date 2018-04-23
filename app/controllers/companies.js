var express = require('express');
var router = express.Router();
var Company = require('../models/company');

router.route('/companies')
	// get all companies
	.get(function(req, res){
		Company.find(function(err, companies){
			if(err){ 
				res.send(err);
			}else{
				res.json(companies);
			}
		});
	});

router.route('/company/:company_id')	
	// get company by id
	.get(function(req, res){
		Company.findById(req.params.company_id, function(err, company){
			if(err){
				res.send(err);
			}else{
				res.json(company);
			}
		});
	});

router.route('/users/:user_id/companies')
	// create new company
	.post(function(req, res){
		var company = new Company();
		
		company.user_id = req.params.user_id;
		company.name = req.body.name;
		company.description = req.body.description;

		company.save(function(err){
			if(err){
				res.send(err);
			}else{
				res.json('Company created!');
			}
		});
	});

router.route('/users/:user_id/companies/:company_id')	
	// edit update company
	.put(function(req, res){
		Company.findById(req.params.company_id, function(err, company){
			if(err){
				res.send(err);
			}else{
				if(company.user_id !== req.params.user_id){
					res.redirect('/', { message: 'You are not authorized!' });
				}else{
					company.user_id = req.params.user_id;
					company.name = req.body.name;
					company.description = req.body.description;

					company.save(function(err){
						if(err){
							res.send(err);
						}else{
							res.json('Company updated!');
						}
					});
				}
			}
		});
	})

	// delete company
	.delete(function(req, res){
		Company.findById(req.params.company_id, function(err){
			if(err){
				res.send(err);
			}else{
				res.json('Company deleted!');
			}
		});
	});

module.exports = router;
