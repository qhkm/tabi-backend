var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');

// get all reservations
router.route('/reservations')
    .get(function(req, res) {
        Reservation.find(function(err, packages) {
            if (err) {
                res.send('No reservations yet.');
            } else {
                res.json(packages);
            }
        })
    })

    // create new reservation
    .post(function(req, res) {
        var reservation = new Reservation();

        reservation.user_id = req.user._id;
        reservation.package_id = req.body.package_id;
        reservation.from = req.body.from;
        reservation.until = req.body.until;
        // reservation status not required; auto pending
        reservation.pax = req.body.pax;

        reservation.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Reservation created!');
            }
        })
    });


router.route('/reservations/:reservation_id')
    // get reservation by id
    .get(function(req, res) {
        Reservation.findById(req.params.reservation_id, function(err, reservation) {
            if (err) {
                res.send(err);
            } else {
                res.json(reservation);
            }
        });
    })

    // edit update reservation
    .put(function(req, res) {
        Reservation.findById(req.params.reservation_id, function(err, reservation) {
            if (err) {
                res.send(err);
            } else {
                reservation.user_id = req.user._id;
                reservation.package_id = req.body.package_id;
                reservation.from = req.body.from;
                reservation.until = req.body.until;
                reservation.status = req.body.status; // to be update by admin or superuser
                reservation.pax = req.body.pax;

                reservation.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json('Reservation updated!');
                    }
                });
            }
        });
    })
    // delete reservation
    .delete(function(req, res) {
        Reservation.remove({
            _id: req.params.reservation_id
        }, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json('Reservation deleted!');
            }
        });
    });

module.exports = router;
