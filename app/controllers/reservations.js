var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');

router.route('/reservations')
    // get all reservations
    .get(function(req, res) {

    });

router.route('/reservations/:reservation_id')
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
