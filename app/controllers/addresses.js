var express = require('express');
var router = express.Router();

var Address = require('../models/address');
var User = require('../models/user');

router.route('/addresses')
    // get all addresses
    .get(function(req, res) {
        Address.find(function(err, addresses) {
            if (err) {
                res.send(err);
            } else {
                res.json(addresses);
            }
        });
    })

    // create new address
    .post(function(req, res) {
        var address = new Address();

        address.user_id = req.user._id;
        address.firstname = req.body.firstname;
        address.lastname = req.body.lastname;
        address.address1 = req.body.address1;
        address.address2 = req.body.address2;
        address.zipcode = req.body.zipcode;
        address.city = req.body.city;
        address.state = req.body.state;
        address.country = req.body.country;
        address.phone = req.body.phone;

        address.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Address saved!');
            }
        })
    });

router.route('/addresses/:address_id')
    // get address by id
    .get(function(req, res) {
        Address.findById(req.params.address_id, function(err, address) {
            if (err) {
                res.send(err);
            } else {
                res.json(address);
            }
        });
    })

    // edit update address
    .put(function(req, res) {
        Address.findById(req.params.address_id, function(err, address) {
            if (err) {
                res.send(err);
            } else {
                address.user_id = req.user._id;
                address.firstname = req.body.firstname;
                address.lastname = req.body.lastname;
                address.address1 = req.body.address1;
                address.address2 = req.body.address2;
                address.zipcode = req.body.zipcode;
                address.city = req.body.city;
                address.state = req.body.state;
                address.country = req.body.country;
                address.phone = req.body.phone;
                address.updated_at = Date.now();

                address.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json('Address updated!');
                    }
                });
            }
        });
    })

    .delete(function(req, res) {
        Address.remove({
            _id: req.params.address_id
        }, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Address deleted!');
            }
        });
    });

module.exports = router;
