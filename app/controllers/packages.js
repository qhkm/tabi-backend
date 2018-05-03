var express = require('express');
var router = express.Router();

var Package = require('../models/package');
var Company = require('../models/company');

// get all packages
router.route('/packages')
    .get(function(req, res) {
        Package.find(function(err, packages) {
            if (err) {
                res.send(err);
            } else {
                res.json(packages);
            }
        });
    });

    // get package based on id
router.route('/packages/:package_id')
    .get(function(req, res) {
        Package.findById(req.params.package_id, function(err, package) {
            if (err) {
                res.send(err);
            } else {
                res.json(package);
            }
        });
    });

    // create new package
router.route('/companies/:company_id/packages')
    .post(function(req, res) {
        var package = new Package();

        package.company_id = req.params.company_id;
        package.name = req.body.name;
        package.description = req.body.description;
        package.price = req.body.price;
        package.category = req.body.category;

        package.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Package created!');
            }
        });
    });

    // edit update package
router.route('/companies/:company_id/packages/:package_id')
    .put(function(req, res) {
        Package.findById(req.params.package_id, function(err, package) {
            if (err) {
                res.send(err);
            } else {
                package.company_id = req.params.company_id;
                package.name = req.body.name;
                package.description = req.body.description;
                package.price = req.body.price;
                package.category = req.body.category;
                package.updated_at = Date.now();

                package.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json('Package updated!');
                    }
                });
            }
        });
    })

    .delete(function(req, res) {
        Package.remove({
            _id: req.params.package_id
        }, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Package deleted!');
            }
        });
    });

module.exports = router;
