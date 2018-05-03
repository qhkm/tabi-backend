var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');

// get all reservations
router.route('/reservations')
    .get(function(req, res) {

    });

    // delete reservation
router.route('/reservations/:reservation_id')
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
