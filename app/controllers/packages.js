var express = require('express');
var router = express.Router();

var Package = require('../models/package');
var Company = require('../models/company');

router.route('/packages')
    // get all packages
    .get(function(req, res) {
        Package.find(function(err, packages) {
            if (err) {
                res.send(err);
            } else {
                res.json(packages);
            }
        });
    });

router.route('/packages/:package_id')
    // get package based on id
    .get(function(req, res) {
        Package.findById(req.params.package_id, function(err, package) {
            if (err) {
                res.send(err);
            } else {
                res.json(package);
            }
        });
    });

router.route('/companies/:company_id/packages')
    // create new package
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

router.route('/companies/:company_id/packages/:package_id')
    // edit update package
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
